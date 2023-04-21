import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Challenge, {
  ChallengeInput,
  ChallengeUpdateInput,
} from "./challenge.entity";
import {
  allChallenges,
  createChallenges,
  updateChallenge,
  deleteChallenges,
} from "./challenge.service";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async challenges(): Promise<Challenge[]> {
    const challengeWithEcogesture = await datasource
      .getRepository(Challenge)
      .find({ relations: { ecogesture: true } });

    // console.log("---------------->", challengeWithEcogesture);

    return await allChallenges();
  }

  @Mutation(() => [Challenge])
  async createChallenges(
    @Arg("inputs", () => [ChallengeInput])
    data: ChallengeInput[]
  ): Promise<Challenge[]> {
    return await createChallenges(data);
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
