import { Arg, Authorized, Ctx, Mutation } from "type-graphql";
import { Resolver } from "type-graphql/dist/decorators/Resolver";
import { ContextType } from "../user/user.resolver";
import { ApolloError } from "apollo-server-errors";
import { updateUserChallengeEcogesture } from "./userChallengeEcogestures.service";
import { UserEcogesturesWithChallengersScore } from "./userChallengeEcogestures.entity";

@Resolver(UserChallengeEcogesturesResolver)
export class UserChallengeEcogesturesResolver {
  @Authorized()
  @Mutation(() => UserEcogesturesWithChallengersScore)
  async updateUserChallengeEcogesture(
    @Ctx() { currentUser }: ContextType,
    @Arg("challengeId") challengeId: string,
    @Arg("ecogestureId") ecogestureId: string
  ): Promise<UserEcogesturesWithChallengersScore> {
    if (currentUser === null || currentUser === undefined)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await updateUserChallengeEcogesture(
      currentUser.id,
      challengeId,
      ecogestureId
    );
  }
}
