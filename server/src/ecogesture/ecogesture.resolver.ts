import { Arg, Mutation, Query, Resolver } from "type-graphql";

import Ecogesture, { EcogestureInput } from "./ecogesture.entity";
import {
  allEcogestures,
  deleteEcogestures,
  createEcogestures,
} from "./ecogesture.service";

@Resolver(Ecogesture)
export class EcogestureResolver {
  @Query(() => [Ecogesture])
  async ecogestures(): Promise<Ecogesture[]> {
    return await allEcogestures();
  }

  @Mutation(() => [Ecogesture])
  async createEcogestures(
    @Arg("inputs", () => [EcogestureInput])
    ecogestureData: EcogestureInput[]
  ): Promise<Ecogesture> {
    return await createEcogestures(ecogestureData);
  }

  @Mutation(() => Boolean)
  async deleteEcogestures(
    @Arg("ids", () => [String]) ecogestureID: string[]
  ): Promise<boolean> {
    return await deleteEcogestures(ecogestureID);
  }
}
