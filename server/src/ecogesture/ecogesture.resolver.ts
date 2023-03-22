import { Arg, Mutation, Query, Resolver } from "type-graphql";

import Ecogesture from "./ecogesture.entity";
import {
  allEcogestures,
  deleteEcogesture,
  addEcogesture,
} from "./ecogesture.service";

@Resolver(Ecogesture)
export class EcogestureResolver {
  @Query(() => [Ecogesture])
  async ecogestures(): Promise<Ecogesture[]> {
    return await allEcogestures();
  }

  @Mutation(() => [Ecogesture])
  async addEcogesture(@Arg("data") data: [Ecogesture]): Promise<Ecogesture[]> {
    return await addEcogesture(data);
  }

  @Mutation(() => Boolean)
  async deleteEcogesture(@Arg("uuid") ecogestureID: string): Promise<boolean> {
    return await deleteEcogesture(ecogestureID);
  }
}
