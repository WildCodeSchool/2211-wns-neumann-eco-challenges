import datasource from "../db";
import UserChallengesCreation from "./userChallengesCreation.entity";

export async function createUserChallengeCreation(
  userId: string,
  challengeId: string
): Promise<UserChallengesCreation> {
  return await datasource
    .getRepository(UserChallengesCreation)
    .save({ challengeId, userId });
}
