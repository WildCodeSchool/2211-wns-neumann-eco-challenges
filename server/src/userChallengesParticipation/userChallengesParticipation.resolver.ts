import { Arg, Mutation, Resolver, Query } from "type-graphql";
import User from "../user/user.entity";
import {
  createUserChallengeParticipation,
  getUserChallengeParticipationByChallengeId,
  getUserChallengeParticipationByUserId,
} from "./userChallengesParticipation.service";
import UserChallengesParticipation from "./userChallengesParticipation.entity";

@Resolver(userChallengesParticipationResolver)
export class userChallengesParticipationResolver {
  @Mutation(() => User)
  async createUserChallengeParticipation(
    @Arg("challengeId") challengeId: string,
    @Arg("userId") userId: string
  ): Promise<User> {
    return await createUserChallengeParticipation(challengeId, userId);
  }

  @Query(() => [UserChallengesParticipation])
  async getUserChallengeParticipationByUserId(
    @Arg("userId") userId: string
  ): Promise<UserChallengesParticipation[]> {
    return await getUserChallengeParticipationByUserId(userId);
  }

  @Query(() => [UserChallengesParticipation])
  async getUserChallengeParticipationByChallengeId(
    @Arg("challengeId") challengeId: string
  ): Promise<UserChallengesParticipation[]> {
    return await getUserChallengeParticipationByChallengeId(challengeId);
  }
}
