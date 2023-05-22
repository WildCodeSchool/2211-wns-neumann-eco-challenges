import { ChallengeEcogestures } from "../challengeEcogestures/challengeEcogestures.entity";
import datasource from "../db";
import UserChallengesCreation from "../userChallengesCreation/userChallengesCreation.entity";
import UserChallengesParticipation from "../userChallengesParticipation/userChallengesParticipation.entity";
import Challenge, {
  ChallengeCreationInput,
  ChallengeUpdateInput,
} from "./challenge.entity";
import { ApolloError } from "apollo-server-errors";

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
        await datasource
          .getRepository(UserChallengesCreation)
          .save({ challengeId: challenge.id, userId });

        // Save participation current user
        await datasource
          .getRepository(UserChallengesParticipation)
          .save({ challengeId: challenge.id, userId });

        // Handle friend invitation - send notification
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
