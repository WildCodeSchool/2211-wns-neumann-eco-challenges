import Challenge from "../challenge/challenge.entity";
import { getChallengeDetails } from "../challenge/challenge.service";
import datasource from "../db";
import User from "../user/user.entity";
import UserChallengesParticipation, {
  UserChallengeParticipationDetails,
} from "./userChallengesParticipation.entity";
import { ApolloError } from "apollo-server-errors";

// Return the list of users invited to the challenge
export async function getUserChallengeParticipationByChallengeId(
  challengeId: string,
  status?: UserChallengesParticipation["status"]
): Promise<UserChallengesParticipation[]> {
  const participations = await datasource
    .getRepository(UserChallengesParticipation)
    .find({
      where: { challengeId, ...(status == null ? {} : { status: undefined }) },
      relations: { user: true },
    });

  return participations;
}

// Return the list of the user's challenges.
// If status is not set, all the challenges are returned
// If status is set, the challenges participations with the speicifed status are returned
export async function getUserChallengeParticipationByUserId(
  userId: string,
  status?: UserChallengesParticipation["status"]
): Promise<UserChallengeParticipationDetails[]> {
  const participations = await datasource
    .getRepository(UserChallengesParticipation)
    .find({
      relations: { challenge: true },
      where: { userId, ...(status == null ? {} : { status: undefined }) },
    });

  const participationsDetailed = await Promise.all(
    participations.map(async (challengeParticipation) => {
      const details = await getChallengeDetails(
        challengeParticipation.challengeId,
        userId
      );
      const rank = details.challengersScore.findIndex(
        ({ id }) => id === userId
      );
      const challengers = await getUserChallengeParticipationByChallengeId(
        challengeParticipation.challengeId
      );
      const invitedChallengers = challengers.length;
      const participatingChallengers = challengers.filter(
        ({ status }) => status === "accepted"
      ).length;

      const completedEcogestures = details.ecogestures.reduce(
        (completedEcogestures, ecogesture) =>
          (completedEcogestures +=
            details.userEcogestures.findIndex(
              ({ ecogestureId }) => ecogestureId === ecogesture.id
            ) !== -1
              ? 1
              : 0),
        0
      );

      const completionPercentage = Math.trunc(
        (completedEcogestures / details.ecogestures.length) * 100
      );

      return {
        ...challengeParticipation,
        rank,
        invitedChallengers,
        participatingChallengers,
        completionPercentage,
      };
    })
  );
  console.log(participationsDetailed);
  return participationsDetailed;
}

// Invite a user (userId) to a challenge (challengeId).
export async function createUserChallengeParticipation(
  challengeId: string,
  userId: string,
  status?: UserChallengesParticipation["status"]
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

  await datasource.getRepository(UserChallengesParticipation).save({
    challengeId,
    userId: user.id,
    ...(status !== undefined ? { status } : {}),
  });

  const userUpdated = await datasource.getRepository(User).findOne({
    where: { id: userId },
    relations: { userChallengesParticipation: true },
  });

  if (userUpdated === null)
    throw new ApolloError("User not found", "NOT_FOUND");

  return userUpdated;
}
