import Challenge from "../challenge/challenge.entity";
import datasource from "../db";
import User from "../user/user.entity";
import UserChallengesParticipation from "./userChallengesParticipation.entity";
import { ApolloError } from "apollo-server-errors";

// Return the list of users invited to the challenge
export async function getUserChallengeParticipationByChallengeId(
  challengeId: string
): Promise<UserChallengesParticipation[]> {
  const participations = await datasource
    .getRepository(UserChallengesParticipation)
    .find({ where: { challengeId }, relations: { user: true } });

  return participations;
}

// Return the list of challenges the user was invited to.
export async function getUserChallengeParticipationByUserId(
  userId: string
): Promise<UserChallengesParticipation[]> {
  const participations = await datasource
    .getRepository(UserChallengesParticipation)
    .find({ where: { userId }, relations: { challenge: true } });

  return participations;
}

// Invite a user (userId) to a challenge (challengeId).
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
