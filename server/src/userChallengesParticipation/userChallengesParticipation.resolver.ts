import { Arg, Mutation, Resolver, Query } from "type-graphql";
import User from "../user/user.entity";
import {
  createUserChallengeParticipation,
  getUserChallengeParticipationByChallengeId,
  getUserChallengeParticipationByUserId,
} from "./userChallengesParticipation.service";
import UserChallengesParticipation, {
  UserChallengeParticipationDetails,
} from "./userChallengesParticipation.entity";

@Resolver(UserChallengesParticipationResolver)
export class UserChallengesParticipationResolver {
  @Mutation(() => User)
  async createUserChallengeParticipation(
    @Arg("challengeId") challengeId: string,
    @Arg("userId") userId: string
  ): Promise<User> {
    return await createUserChallengeParticipation(challengeId, userId);
  }

  @Query(() => [UserChallengeParticipationDetails])
  async getUserChallengeParticipationByUserId(
    @Arg("userId") userId: string
  ): Promise<UserChallengeParticipationDetails[]> {
    return await getUserChallengeParticipationByUserId(userId, "accepted");
  }

  @Query(() => [UserChallengesParticipation])
  async getUserChallengeParticipationByChallengeId(
    @Arg("challengeId") challengeId: string
  ): Promise<UserChallengesParticipation[]> {
    return await getUserChallengeParticipationByChallengeId(challengeId);
  }
}
