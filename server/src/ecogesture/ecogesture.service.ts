import { ApolloError } from "apollo-server";
import datasource from "../db";
import Ecogesture from "./ecogesture.entity";

export async function addEcogesture(
  ecogestures: Ecogesture[]
): Promise<Ecogesture[]> {
  return await datasource.getRepository(Ecogesture).save(ecogestures);
}

export async function deleteEcogesture(ecogestureID: string): Promise<boolean> {
  const affected = datasource.getRepository(Ecogesture).delete(ecogestureID);
  if (affected === null || affected === undefined) {
    throw new ApolloError("Ecogesture not found", "NOT_FOUND");
  } else return true;
}

export async function allEcogestures(): Promise<Ecogesture[]> {
  const ecogestures: Ecogesture[] = await datasource
    .getRepository(Ecogesture)
    .find();
  return ecogestures;
}
