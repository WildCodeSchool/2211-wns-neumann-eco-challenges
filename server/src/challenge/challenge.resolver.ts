import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Challenge, {
  ChallengeInput,
  ChallengeUpdateInput,
} from "./challenge.entity";
import { allChallenges } from "./challenge.service";
import { ApolloError } from "apollo-server-errors";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async challenges(): Promise<Challenge[]> {
    return await allChallenges();
  }

  @Mutation(() => Challenge)
  async addChallenge(
    @Arg("challenges") challenges: ChallengeInput
  ): Promise<Challenge> {
    return await datasource.getRepository(Challenge).save(challenges);
  }

  @Mutation(() => Challenge)
  async updateChallenge(
    @Arg("id", () => String) id: string,
    @Arg("data") data: ChallengeUpdateInput
  ): Promise<Challenge> {
    const { name, status, startingDate, endingDate } = data;
    const challengeToUpdate = await datasource
      .getRepository(Challenge)
      .findOne({
        where: { id },
      });

    if (challengeToUpdate === null)
      throw new ApolloError("Challenge not found", "NOT_FOUND");

    return await datasource
      .getRepository(Challenge)
      .save({ id, name, status, startingDate, endingDate });
  }

  @Mutation(() => Boolean)
  async deleteChallenge(@Arg("id", () => String) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Challenge).delete(id);
    if (affected === 0)
      throw new ApolloError("Challenge not found", "NOT_FOUND");
    return true;
  }
}
