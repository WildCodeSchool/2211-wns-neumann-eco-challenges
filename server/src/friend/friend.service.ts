import { ApolloError } from "apollo-server-errors";
import datasource from "../db";
import User from "../user/user.entity";
import Friend, { FriendRelationship } from "./friend.entity";
import {
  deleteFriendInvitation,
  notifyFriendInvitation,
} from "../notification/notification.service";
import { In, Not } from "typeorm";

export async function getFriends(
  userId: string,
  onlyFriends: boolean,
  status?: Friend["status"]
): Promise<FriendRelationship[]> {
  // Find friend relationship where the current user is whether the sender or the receiver
  const friends = await datasource.getRepository(Friend).find({
    where: [
      { userId, status },
      { friendId: userId, status },
    ],
  });

  // Get the user's friends ids and their status.
  const friendIdsAndStatus: Array<{
    friendId: string;
    status: FriendRelationship["status"];
  }> = friends.map(({ friendId, userId: userIdInFriend, status }) => ({
    // If the friend id is the current user id, we get the friend id which is the user id
    // If not, the userId is the current userId, we return the friend id
    friendId: friendId === userId ? userIdInFriend : friendId,
    status,
  }));

  const friendsList = await Promise.all(
    friendIdsAndStatus.map(async ({ friendId, status }) => {
      const friend = await datasource.getRepository(User).findOneOrFail({
        where: { id: friendId },
      });
      return { friend, status };
    })
  );

  // Includes all the users even those we are not friend with
  if (onlyFriends != null && !onlyFriends) {
    const friendsIdWithCurrentUser = friendsList.map(
      ({ friend: { id } }) => id
    );
    friendsIdWithCurrentUser.push(userId);
    console.log(friendsList.map(({ friend: { id } }) => id));
    const othersUsers = await datasource.getRepository(User).find({
      where: { id: Not(In(friendsIdWithCurrentUser)) },
    });

    // Add all users who are not in a process of becoming friend with the current user.
    friendsList.push(
      ...othersUsers.map((user) => ({
        friend: user,
        status: "none" as FriendRelationship["status"],
      }))
    );
  }

  return friendsList;
}

export async function updateFriendRelationshipStatus(
  userId: string,
  friendId: string,
  status: Friend["status"]
): Promise<void> {
  const { affected } = await datasource
    .getRepository(Friend)
    .update({ userId, friendId }, { status });

  if (affected == null || affected === 0)
    throw new ApolloError(
      "[updateFriendRelationshipStatus] - Cannot update friend relationship",
      "NOT_FOUND"
    );
}
export async function updateFriendRelationship(
  userId: string,
  friendId: string
): Promise<User> {
  // Relation is unique for a pair of userId and friendId
  // Can be : userId - friendId or friendId - userId
  const doesRelationUserIdFriendIdExists = await datasource
    .getRepository(Friend)
    .exist({ where: { userId, friendId } });
  const doesRelationUserIdFriendIdReversedExists = await datasource
    .getRepository(Friend)
    .exist({ where: { userId: friendId, friendId: userId } });

  // Delete friend relationship & friend notification
  if (
    doesRelationUserIdFriendIdReversedExists ||
    doesRelationUserIdFriendIdExists
  ) {
    const _userId = doesRelationUserIdFriendIdExists ? userId : friendId;
    const _friendId = doesRelationUserIdFriendIdExists ? friendId : userId;
    await datasource.getRepository(Friend).delete({
      userId: _userId,
      friendId: _friendId,
    });
    // Delete only friend invitations that are in pending.
    await deleteFriendInvitation(userId, friendId);

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
