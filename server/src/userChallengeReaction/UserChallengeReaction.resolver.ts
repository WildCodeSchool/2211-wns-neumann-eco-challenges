import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserChallengeReaction, {
  ReactionEmojis,
  ReactionEmojisIcons,
  ReactionEmojisWithIcon,
} from "./UserChallengeReaction.entity";
import {
  createOrUpdateUserChallengeReaction,
  deleteUserChallengeReaction,
  getChallengeReactions,
  getUserChallengeReaction,
  getUserChallengesReactions,
} from "./UserChallengeReaction.service";
import { ContextType } from "../user/user.resolver";
import { ApolloError } from "apollo-server-errors";

@Resolver(() => UserChallengeReaction)
export class UserChallengeReactionResolver {
  @Authorized()
  @Mutation(() => UserChallengeReaction)
  async createOrUpdateUserChallengeReaction(
    @Arg("challengeId") challengeId: string,
    @Ctx() { currentUser }: ContextType,
    @Arg("content", () => ReactionEmojis) content: ReactionEmojis
  ): Promise<UserChallengeReaction> {
    if (currentUser == null)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await createOrUpdateUserChallengeReaction(
      challengeId,
      currentUser.id,
      content
    );
  }

  @Authorized()
  @Query(() => [UserChallengeReaction])
  async getChallengeReactions(
    @Arg("challengeId") challengeId: string
  ): Promise<UserChallengeReaction[]> {
    return await getChallengeReactions(challengeId);
  }

  @Authorized()
  @Query(() => [ReactionEmojisWithIcon])
  async getReactionEmojis(): Promise<ReactionEmojisWithIcon[]> {
    return ReactionEmojisIcons;
  }

  @Authorized()
  @Query(() => UserChallengeReaction)
  async getUserChallengeReaction(
    @Ctx() { currentUser }: ContextType,
    @Arg("challengeId") challengeId: string
  ): Promise<UserChallengeReaction | null> {
    if (currentUser === null || currentUser === undefined)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await getUserChallengeReaction(currentUser.id, challengeId);
  }

  @Authorized()
  @Query(() => [UserChallengeReaction])
  async getUserChallengesReactions(
    @Ctx() { currentUser }: ContextType,
    @Arg("challengesId", () => [String]) challengesId: string[]
  ): Promise<UserChallengeReaction[]> {
    if (currentUser == null)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await getUserChallengesReactions(currentUser.id, challengesId);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteUserChallengeReaction(
    @Ctx() { currentUser }: ContextType,
    @Arg("challengeId") challengeId: string
  ): Promise<boolean> {
    if (currentUser == null)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await deleteUserChallengeReaction(challengeId, currentUser.id);
  }
}
