import Challenge from "../challenge/challenge.entity";
import datasource from "../db";
import User from "../user/user.entity";
import UserChallengesParticipation from "./userChallengesParticipation.entity";
import { ApolloError } from "apollo-server-errors";

export async function createUserChallengeParticipation(
  challengeId: string,
  userId: string
): Promise<User> {
  const challenge = await datasource
    .getRepository(Challenge)
    .findOneBy({ id: challengeId });

  if (challenge === null || challenge === undefined) {
    throw new ApolloError("Challenge not found", "NOT_FOUND");
  }
  const user = await datasource.getRepository(User).findOne({
    where: { id: userId },
    relations: { userChallengesParticipation: true },
  });

  if (user === null) throw new ApolloError("User not found", "NOT_FOUND");

  await datasource
    .getRepository(UserChallengesParticipation)
    .save({ challengeId, userId: user.id as string });

  const userUpdated = await datasource.getRepository(User).findOne({
    where: { id: userId },
    relations: { userChallengesParticipation: true },
  });

  if (userUpdated === null)
    throw new ApolloError("User not found", "NOT_FOUND");

  return userUpdated;
}
