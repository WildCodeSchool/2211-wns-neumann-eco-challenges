import { ApolloError } from "apollo-server-errors";
import datasource from "../db";
import User from "../user/user.entity";
import Friend, { FriendRelationship } from "./friend.entity";
import { getUsers } from "../user/user.service";
import { notifyFriendInvitation } from "../notification/notification.service";

export async function getFriends(
  userId: string,
  onlyFriends: boolean,
  status?: Friend["status"]
): Promise<FriendRelationship[]> {
  const friends = await datasource
    .getRepository(Friend)
    .find({ where: { userId, status } });

  let friendIdsAndStatus: Array<{
    friendId: string;
    status: FriendRelationship["status"];
  }> = friends.map(({ friendId, status }) => ({
    friendId,
    status,
  }));

  // Includes all the users even those we are not friend with
  if (onlyFriends != null && !onlyFriends) {
    const notFriends = (await getUsers()).filter(
      ({ id }) =>
        id !== userId &&
        friends.findIndex(({ friendId }) => id === friendId) === -1
    );

    friendIdsAndStatus = [
      ...friendIdsAndStatus,
      ...notFriends.map(
        ({
          id: friendId,
        }): { friendId: string; status: FriendRelationship["status"] } => ({
          friendId,
          status: "none",
        })
      ),
    ];
  }

  const friendList = await Promise.all(
    friendIdsAndStatus.map(async ({ friendId, status }) => {
      const friend = await datasource.getRepository(User).findOneOrFail({
        where: { id: friendId },
      });
      return { friend, status };
    })
  );
  return friendList;
}

export async function updateFriendRelationship(
  userId: string,
  friendId: string
): Promise<User> {
  const removeFriendRelationship = await datasource
    .getRepository(Friend)
    .exist({ where: { userId, friendId } });

  // Delete friend relationship & friend notification
  if (removeFriendRelationship) {
    await datasource.getRepository(Friend).delete({ userId, friendId });

    // Add friend relationship & friend notification
  } else {
    await datasource.getRepository(Friend).save({ userId, friendId });
    await notifyFriendInvitation(userId, friendId);
  }

  const userWithFriends = await datasource
    .getRepository(User)
    .findOne({ where: { id: userId } });

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
