import datasource from "../db";
import Ecogesture from "./ecogesture.entity";

export async function addEcogesture(
  ecogestures: Ecogesture[]
): Promise<Ecogesture[]> {
  return await datasource.getRepository(Ecogesture).save(ecogestures);
}

export async function allEcogestures(): Promise<Ecogesture[]> {
  const ecogestures: Ecogesture[] = await datasource
    .getRepository(Ecogesture)
    .find();
  return ecogestures;
}
