import { Arg, Mutation, Resolver } from "type-graphql";
import User from "../user/user.entity";
import { createUserChallengeParticipation } from "./userChallengesParticipation.service";

@Resolver(userChallengesParticipationResolver)
export class userChallengesParticipationResolver {
  @Mutation(() => User)
  async createUserChallengeParticipation(
    @Arg("challengeId") challengeId: string,
    @Arg("userId") userId: string
  ): Promise<User> {
    return await createUserChallengeParticipation(challengeId, userId);
  }
}
