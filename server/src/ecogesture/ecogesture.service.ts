import { ApolloError } from "apollo-server";
import datasource from "../db";
import Ecogesture, { EcogestureInput } from "./ecogesture.entity";

export async function createEcogestures(
  ecogestures: EcogestureInput[]
): Promise<Ecogesture[]> {
  return await Promise.all(
    ecogestures.map(
      async (ecogesture) =>
        await datasource.getRepository(Ecogesture).save({ ...ecogesture })
    )
  );
}

export async function getEcogestures(): Promise<Ecogesture[]> {
  const ecogestures: Ecogesture[] = await datasource
    .getRepository(Ecogesture)
    .find();
  return ecogestures;
}

export async function deleteEcogestures(
  ecogestureIDs: string[]
): Promise<boolean[]> {
  return await Promise.all(
    ecogestureIDs.map(async (id) => {
      const { affected } = await datasource
        .getRepository(Ecogesture)
        .delete(id);
      if (affected === 0) {
        throw new ApolloError("Ecogesture not found", "NOT_FOUND");
      }
      return true;
    })
  );
}
