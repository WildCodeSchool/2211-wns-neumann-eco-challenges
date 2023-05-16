import { ApolloError } from "apollo-server-errors";
import datasource from "../db";
import User from "../user/user.entity";
import Friend, { FriendRelationship } from "./friend.entity";

export async function getFriends(
  userId: string
): Promise<FriendRelationship[]> {
  const user = await datasource
    .getRepository(User)
    .findOne({ where: { id: userId }, relations: { friends: true } });

  if (user === null) throw new ApolloError("User not found", "NOT_FOUND");

  const { friends } = user;

  const friendIdsAndStatus = friends.map(({ friendId, status }) => ({
    friendId,
    status,
  }));

  const friendList = await Promise.all(
    friendIdsAndStatus.map(async ({ friendId, status }) => {
      const friend = (await datasource.getRepository(User).findOne({
        where: { id: friendId },
        // check good practice
      })) as FriendRelationship["friend"];
      return { friend, status };
    })
  );
  return friendList;
}

export async function addFriend(
  userId: string,
  friendId: string
): Promise<User> {
  const user = await datasource
    .getRepository(User)
    .findOne({ where: { id: userId }, relations: { friends: true } });
  if (user === null) throw new ApolloError("User not found", "NOT_FOUND");

  await datasource.getRepository(Friend).save({ userId, friendId });

  // id test :
  // "ed23f909-2a12-483e-87da-9bf0ecd15d8f"
  // "fef3fe70-6caa-48ef-af9d-f86f9ec6b100"

  const userWithFriends = await datasource
    .getRepository(User)
    .findOne({ where: { id: userId }, relations: { friends: { user: true } } });

  if (userWithFriends === null)
    throw new ApolloError("User not found", "NOT_FOUND");

  return userWithFriends;
}

export async function deleteFriend(
  userId: string,
  friendId: string
): Promise<User> {
  const user = await datasource
    .getRepository(User)
    .findOne({ where: { id: userId }, relations: { friends: true } });
  if (user === null) throw new ApolloError("User not found", "NOT_FOUND");

  await datasource.getRepository(Friend).delete({ userId, friendId });

  const deletedFriend = await datasource
    .getRepository(User)
    .findOne({ where: { id: friendId } });

  if (deletedFriend === null)
    throw new ApolloError("User not found", "NOT_FOUND");

  return deletedFriend;
}
