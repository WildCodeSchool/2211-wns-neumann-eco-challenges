import datasource from "../db";
import Challenge, {
  ChallengeInput,
  ChallengeUpdateInput,
} from "./challenge.entity";
import { ApolloError } from "apollo-server-errors";

export async function allChallenges(): Promise<Challenge[]> {
  const challenges: Challenge[] = await datasource
    .getRepository(Challenge)
    .find();
  return challenges;
}

export async function createChallenges(
  challenges: ChallengeInput[]
): Promise<Challenge[]> {
  return await Promise.all(
    challenges.map(async ({ name, status, startingDate, endingDate }) => {
      return await datasource
        .getRepository(Challenge)
        .save({ name, status, startingDate, endingDate });
    })
  );
}

export async function updateChallenge(
  id: string,
  challenges: ChallengeUpdateInput
): Promise<Challenge> {
  const { name, status, startingDate, endingDate } = challenges;
  const challengeToUpdate = await datasource.getRepository(Challenge).findOne({
    where: { id },
  });

  if (challengeToUpdate === null)
    throw new ApolloError("Challenge not found", "NOT_FOUND");

  return await datasource
    .getRepository(Challenge)
    .save({ id, name, status, startingDate, endingDate });
}

export async function deleteChallenges(
  challengeID: string[]
): Promise<boolean[]> {
  return await Promise.all(
    challengeID.map(async (id) => {
      const { affected } = await datasource.getRepository(Challenge).delete(id);
      if (affected === 0)
        throw new ApolloError("Challenge not found", "NOT_FOUND");
      return true;
    })
  );
}
