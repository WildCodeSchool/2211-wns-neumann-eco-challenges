import { ApolloError } from "apollo-server";
import datasource from "../db";
import Ecogesture, { EcogestureInput } from "./ecogesture.entity";

export async function createEcogestures(
  ecogestures: EcogestureInput[]
): Promise<Ecogesture> {
  const { name, difficulty, isProofNeeded, reward } = ecogestures[0];
  return await datasource
    .getRepository(Ecogesture)
    .save({ name, difficulty, isProofNeeded, reward });
}

export async function allEcogestures(): Promise<Ecogesture[]> {
  const ecogestures: Ecogesture[] = await datasource
    .getRepository(Ecogesture)
    .find();
  return ecogestures;
}

export async function deleteEcogestures(
  ecogestureID: string[]
): Promise<boolean> {
  const affected = datasource.getRepository(Ecogesture).delete(ecogestureID);
  if (affected === null || affected === undefined) {
    throw new ApolloError("Ecogesture not found", "NOT_FOUND");
  } else return true;
}
