import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";

import Ecogesture, { EcogestureInput } from "./ecogesture.entity";
import {
  getEcogestures,
  deleteEcogestures,
  createEcogestures,
} from "./ecogesture.service";

@Resolver(Ecogesture)
export class EcogestureResolver {
  @Authorized()
  @Query(() => [Ecogesture])
  async ecogestures(): Promise<Ecogesture[]> {
    return await getEcogestures();
  }

  @Authorized()
  @Mutation(() => [Ecogesture])
  async createEcogestures(
    @Arg("ecogestureInputs", () => [EcogestureInput])
    ecogestureData: EcogestureInput[]
  ): Promise<Ecogesture[]> {
    return await createEcogestures(ecogestureData);
  }

  @Mutation(() => [Boolean])
  async deleteEcogestures(
    @Arg("ids", () => [String]) ecogestureIDs: string[]
  ): Promise<boolean[]> {
    return await deleteEcogestures(ecogestureIDs);
  }
}
