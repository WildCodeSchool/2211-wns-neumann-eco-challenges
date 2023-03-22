import datasource from "../db";
import Challenge from "./challenge.entity";

export async function allChallenges(): Promise<Challenge[]> {
  const challenges: Challenge[] = await datasource
    .getRepository(Challenge)
    .find();
  return challenges;
}

export async function addChallenge(
  challenges: Challenge[]
): Promise<Challenge[]> {
  return await datasource.getRepository(Challenge).save(challenges);
}
