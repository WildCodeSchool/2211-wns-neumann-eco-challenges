import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import UserChallengeReaction, {
  EmojiList,
} from "./UserChallengeReaction.entity";
import {
  createUserChallengeReaction,
  deleteUserChallengeReaction,
  getUserChallengeReaction,
} from "./UserChallengeReaction.service";

@Resolver(() => UserChallengeReaction)
export class UserChallengeReactionResolver {
  @Mutation(() => UserChallengeReaction)
  async createUserChallengeReaction(
    @Arg("challengeId") challengeId: string,
    @Arg("userId") userId: string,
    @Arg("content") content: EmojiList
  ): Promise<UserChallengeReaction> {
    const hasAlreadyReact = await datasource
      .getRepository(UserChallengeReaction)
      .find({ where: { challengeId, userId } });
    if (hasAlreadyReact.length > 0) {
      await deleteUserChallengeReaction(challengeId, userId);
    }
    return await createUserChallengeReaction(challengeId, userId, content);
  }

  @Query(() => [UserChallengeReaction])
  async getUserChallengeReaction(
    @Arg("challengeId") challengeId: string
  ): Promise<UserChallengeReaction[]> {
    return await getUserChallengeReaction(challengeId);
  }

  @Mutation(() => Boolean)
  async deleteUserChallengeReaction(
    @Arg("challengeId") challengeId: string,
    @Arg("userId") userId: string
  ): Promise<boolean> {
    return await deleteUserChallengeReaction(challengeId, userId);
  }
}
