import { Query, Resolver } from "type-graphql";

import Ecogesture from "./ecogesture.entity";
import { allEcogestures } from "./ecogesture.service";

@Resolver(Ecogesture)
export class EcogestureResolver {
  @Query(() => [Ecogesture])
  async ecogestures(): Promise<Ecogesture[]> {
    return await allEcogestures();
  }
}
