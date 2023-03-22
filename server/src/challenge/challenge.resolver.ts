import { Query, Resolver } from "type-graphql";
import Challenge from "./challenge.entity";
import { allChallenges } from "./challenge.service";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async challenges(): Promise<Challenge[]> {
    return await allChallenges();
  }
}
