import datasource from "../db";
import UserChallengeReaction, {
  EmojiList,
} from "./UserChallengeReaction.entity";

export async function createUserChallengeReaction(
  challengeId: string,
  userId: string,
  content: EmojiList
): Promise<UserChallengeReaction> {
  return await datasource
    .getRepository(UserChallengeReaction)
    .save({ challengeId, userId, content });
}

export async function getUserChallengeReaction(
  challengeId: string
): Promise<UserChallengeReaction[]> {
  return await datasource
    .getRepository(UserChallengeReaction)
    .find({ relations: { challenge: true }, where: { challengeId } });
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
