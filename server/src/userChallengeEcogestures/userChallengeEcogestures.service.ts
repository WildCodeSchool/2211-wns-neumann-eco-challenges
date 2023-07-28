import { ApolloError } from "apollo-server-errors";
import datasource from "../db";
import Ecogesture from "../ecogesture/ecogesture.entity";
import UserChallengeEcogestures, {
  UserChallengeScore,
  UserEcogesturesWithChallengersScore,
} from "./userChallengeEcogestures.entity";
import { getUserChallengeParticipationByChallengeId } from "../userChallengesParticipation/userChallengesParticipation.service";
import moment from "moment";
import { getUsersById } from "../user/user.service";

export async function getUserChallengeEcogesturesByUserAndChallengeId(
  userId: string,
  challengeId: string
): Promise<UserChallengeEcogestures[]> {
  const userChallengeEcogesture = await datasource
    .getRepository(UserChallengeEcogestures)
    .find({
      where: { challengeId, userId },
      order: { completionDate: "DESC" },
    });
  return userChallengeEcogesture;
}

export async function updateUserChallengeEcogesture(
  userId: string,
  challengeId: string,
  ecogestureId: string,
  proof?: string
): Promise<UserEcogesturesWithChallengersScore> {
  const isAlreadyDone = await datasource
    .getRepository(UserChallengeEcogestures)
    .exist({ where: { challengeId, ecogestureId, userId } });

  if (isAlreadyDone)
    await datasource
      .getRepository(UserChallengeEcogestures)
      .delete({ userId, ecogestureId, challengeId });
  else {
    const ecogesture = await datasource
      .getRepository(Ecogesture)
      .findOne({ where: { id: ecogestureId } });
    if (ecogesture === null)
      throw new ApolloError(
        "[updateUserChallengeEcogesture] - Ecogesture not found",
        "ECOGESTURE_NOT_FOUND"
      );
    await datasource.getRepository(UserChallengeEcogestures).save({
      userId,
      ecogestureId,
      challengeId,
      reward: ecogesture.reward,
      proof,
    });
  }

  const userEcogestures = await datasource
    .getRepository(UserChallengeEcogestures)
    .find({ where: { userId, challengeId } });
  const challengersId = (
    await getUserChallengeParticipationByChallengeId(challengeId, "accepted")
  ).map(({ userId }) => userId);
  const challengersScore = await getChallengersScore(
    challengeId,
    challengersId
  );

  return { challengersScore, userEcogestures };
}

export async function getChallengersScore(
  challengeId: string,
  challengersId: string[],
  sorted = true
): Promise<UserChallengeScore[]> {
  const challengersParticipation =
    await getUserChallengeParticipationByChallengeId(challengeId, "accepted");

  const challengersScore = await Promise.all(
    challengersId.map(async (userId) => {
      const challengerEcogestures =
        await getUserChallengeEcogesturesByUserAndChallengeId(
          userId,
          challengeId
        );

      // Last completion date
      // Seek first for completion date of the last ecogesture validated
      // Return a now date.
      const lastCompletionDate =
        challengerEcogestures?.[0]?.completionDate ??
        challengersParticipation.find(
          ({ userId: challengerId }) => userId === challengerId
        )?.updatedDate ??
        moment();

      return {
        lastCompletionDate,
        challengerScore: {
          id: userId,
          score: challengerEcogestures.reduce(
            (score, { reward }) => (score += reward),
            0
          ),
        },
      };
    })
  );

  if (sorted)
    challengersScore.sort(
      (
        {
          challengerScore: { score: scoreA },
          lastCompletionDate: latestCompletionDateA,
        },
        {
          challengerScore: { score: scoreB },
          lastCompletionDate: latestCompletionDateB,
        }
      ) =>
        scoreB - scoreA === 0
          ? latestCompletionDateA < latestCompletionDateB
            ? -1
            : latestCompletionDateA > latestCompletionDateB
            ? 1
            : 0
          : scoreB - scoreA
    );

  return challengersScore.map(({ challengerScore }) => challengerScore);
}
