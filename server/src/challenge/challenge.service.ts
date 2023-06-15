import Category from "../category/category.entity";
import { ChallengeEcogestures } from "../challengeEcogestures/challengeEcogestures.entity";
import datasource from "../db";
import { getEcogesturesById } from "../ecogesture/ecogesture.service";
import { notifyChallengeInvitation } from "../notification/notification.service";
import { getUsersById } from "../user/user.service";
import {
  getChallengersScore,
  getUserChallengeEcogesturesByUserAndChallengeId,
} from "../userChallengeEcogestures/userChallengeEcogestures.service";
import { createUserChallengeCreation } from "../userChallengesCreation/userChallengeCreation.service";
import { createUserChallengeParticipation } from "../userChallengesParticipation/userChallengesParticipation.service";
import Challenge, {
  ChallengeCreationInput,
  ChallengeDetails,
  ChallengeUpdateInput,
} from "./challenge.entity";
import { ApolloError } from "apollo-server-errors";

export async function getChallengeDetails(
  challengeId: string,
  userId: string
): Promise<ChallengeDetails> {
  const challenge = await datasource.getRepository(Challenge).findOne({
    where: { id: challengeId },
    relations: {
      challengeEcogestures: true,
      userChallengesParticipation: true,
      userChallengeEcogestures: true,
    },
  });

  if (challenge === null)
    throw new ApolloError("Challenge not found", "NOT_FOUND");

  // Get ecogestures
  const ecogestures = await getEcogesturesById(
    challenge.challengeEcogestures.map(({ ecogestureId }) => ecogestureId)
  );

  // Get categories
  const categories: Category[] = [];
  ecogestures.forEach(({ category }) => {
    // Category not already added to categories
    if (!categories.some(({ id }) => id === category.id))
      categories.push(category);
  });

  const totalEcogesturesScore = ecogestures.reduce(
    (totalScore, { reward }) => (totalScore += reward),
    0
  );

  // Get list of challengers who accepted the challenge including the creator
  const challengersId = challenge.userChallengesParticipation
    .filter(({ status }) => status === "accepted")
    .map(({ userId }) => userId);

  const challengersScore = await getChallengersScore(
    challenge.id,
    challengersId
  );

  // Get user validated ecogestures
  const userEcogestures = await getUserChallengeEcogesturesByUserAndChallengeId(
    userId,
    challenge.id
  );

  // Get challengers informations: name
  const challengers = await getUsersById(challengersId);

  return {
    challenge: {
      ...challenge,
    },
    categories,
    challengers,
    ecogestures,
    userEcogestures,
    challengersScore,
    totalEcogesturesScore,
  };
}

export async function getChallengeById(
  challengeId: string
): Promise<Challenge | null> {
  return await datasource
    .getRepository(Challenge)
    .findOne({ where: { id: challengeId } });
}

export async function allChallenges(): Promise<Challenge[]> {
  const challenges: Challenge[] = await datasource
    .getRepository(Challenge)
    .find({
      relations: {
        challengeEcogestures: true,
        userChallengesParticipation: { challenge: true, user: true },
      },
    });

  return challenges;
}

export async function createChallenges(
  userId: string,
  challenges: ChallengeCreationInput[]
): Promise<Challenge[]> {
  return await Promise.all(
    // For each challenge
    challenges.map(
      async ({
        challenge: { name, status, startingDate, endingDate },
        ecogesturesId,
        challengersId,
      }) => {
        // Save challenge
        const challenge = await datasource
          .getRepository(Challenge)
          .save({ name, status, startingDate, endingDate });

        // Save ecogestures with challenge
        await Promise.all(
          ecogesturesId.map(
            async (ecogestureId) =>
              await datasource
                .getRepository(ChallengeEcogestures)
                .save({ challengeId: challenge.id, ecogestureId })
          )
        );

        // Save challenge creation
        await createUserChallengeCreation(userId, challenge.id);

        // Save participation current user
        await createUserChallengeParticipation(
          challenge.id,
          userId,
          "accepted"
        );

        // Handle friend invitation - send notification
        await Promise.all(
          challengersId.map(async (id) => {
            // Create participations
            await createUserChallengeParticipation(challenge.id, id);
            // Send notifications
            await notifyChallengeInvitation(userId, id, challenge.id);
          })
        );

        return challenge;
      }
    )
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
