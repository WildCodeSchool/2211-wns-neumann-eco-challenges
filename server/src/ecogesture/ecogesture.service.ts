import { ApolloError } from "apollo-server";
import datasource from "../db";
import Ecogesture, { EcogestureInput } from "./ecogesture.entity";
import Category from "../category/category.entity";

export async function createEcogestures(
  ecogestures: EcogestureInput[]
): Promise<Ecogesture[]> {
  return await Promise.all(
    ecogestures.map(async (ecogesture) => {
      const category = await datasource
        .getRepository(Category)
        .findOne({ where: { id: ecogesture.categoryId } });
      if (category === null)
        throw new ApolloError(
          "[createEcogestures] - Cannot get ecogesture category",
          "CATEGORY_NOT_FOUND"
        );
      return await datasource
        .getRepository(Ecogesture)
        .save({ ...ecogesture, category });
    })
  );
}
export async function getEcogesturesById(
  ecogesturesId: string[]
): Promise<Ecogesture[]> {
  const ecogestures = await Promise.all(
    ecogesturesId.map(
      async (id) =>
        await datasource
          .getRepository(Ecogesture)
          .find({ where: { id }, relations: { category: true } })
    )
  );
  return ecogestures.flat();
}
export async function getEcogestures(): Promise<Ecogesture[]> {
  const ecogestures: Ecogesture[] = await datasource
    .getRepository(Ecogesture)
    .find({
      relations: { category: true },
      order: { reward: { direction: "ASC" } },
    });
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
