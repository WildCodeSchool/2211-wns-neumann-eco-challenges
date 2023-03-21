import datasource from "../db";
import Ecogesture from "./ecogesture.entity";

export async function allEcogestures(): Promise<Ecogesture[]> {
  const ecogestures: Ecogesture[] = await datasource
    .getRepository(Ecogesture)
    .find();
  return ecogestures;
}
