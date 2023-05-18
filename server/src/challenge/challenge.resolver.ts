import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import Challenge, {
  ChallengeCreationInput,
  ChallengeUpdateInput,
} from "./challenge.entity";
import {
  allChallenges,
  createChallenges,
  updateChallenge,
  deleteChallenges,
} from "./challenge.service";
import { ContextType } from "../user/user.resolver";
import { ApolloError } from "apollo-server-errors";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async challenges(): Promise<Challenge[]> {
    return await allChallenges();
  }

  @Authorized()
  @Mutation(() => [Challenge])
  async createChallenges(
    @Arg("challenges", () => [ChallengeCreationInput], { validate: false })
    data: ChallengeCreationInput[],
    @Ctx() { currentUser }: ContextType
  ): Promise<Challenge[]> {
    if (currentUser === null || currentUser === undefined)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await createChallenges(currentUser.id, data);
  }

  @Mutation(() => Challenge)
  async updateChallenge(
    @Arg("id", () => String) id: string,
    @Arg("data", () => ChallengeUpdateInput) data: ChallengeUpdateInput
  ): Promise<Challenge> {
    return await updateChallenge(id, data);
  }

  @Mutation(() => [Boolean])
  async deleteChallenges(
    @Arg("id", () => [String]) id: string[]
  ): Promise<boolean[]> {
    return await deleteChallenges(id);
  }
}
