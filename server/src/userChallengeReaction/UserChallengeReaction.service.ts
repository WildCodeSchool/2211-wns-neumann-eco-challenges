import { ApolloError } from "apollo-server-errors";
import datasource from "../db";
import UserChallengeReaction, {
  ReactionEmojis,
} from "./UserChallengeReaction.entity";
import { In } from "typeorm";

export async function createOrUpdateUserChallengeReaction(
  challengeId: string,
  userId: string,
  reaction: ReactionEmojis
): Promise<UserChallengeReaction> {
  await datasource.getRepository(UserChallengeReaction).upsert(
    { challengeId, userId, content: reaction },
    {
      skipUpdateIfNoValuesChanged: true, // If true, postgres will skip the update if no values would be changed (reduces writes)
      conflictPaths: ["challengeId", "userId"], // column(s) name that you would like to ON CONFLICT
    }
  );
  const userChallengeReaction = await datasource
    .getRepository(UserChallengeReaction)
    .findOne({ where: { challengeId, userId } });

  if (userChallengeReaction == null)
    throw new ApolloError("Cannot get user challenge reaction", "NOT_FOUND");

  return userChallengeReaction;
}

export async function getChallengeReactions(
  challengeId: string
): Promise<UserChallengeReaction[]> {
  return await datasource
    .getRepository(UserChallengeReaction)
    .find({ where: { challengeId } });
}

export async function getUserChallengeReaction(
  userId: string,
  challengeId: string
): Promise<UserChallengeReaction | null> {
  return await datasource
    .getRepository(UserChallengeReaction)
    .findOne({ where: { challengeId, userId } });
}

export async function getUserChallengesReactions(
  userId: string,
  challengesId: string[]
): Promise<UserChallengeReaction[]> {
  return await datasource.getRepository(UserChallengeReaction).find({
    where: { challengeId: In(challengesId), userId },
  });
}
export async function deleteUserChallengeReaction(
  challengeId: string,
  userId: string
): Promise<boolean> {
  await datasource
    .getRepository(UserChallengeReaction)
    .delete({ challengeId, userId });
  return true;
}
