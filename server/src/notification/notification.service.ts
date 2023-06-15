import { ApolloError } from "apollo-server";
import { getChallengeById } from "../challenge/challenge.service";
import datasource from "../db";
import { getUsersById } from "../user/user.service";
import Notification from "./notification.entity";
const CHALLENGE_INVITE_TEMPLATE =
  "<b>$sender$</b> wants you to join the challenge <b>$challengeName$</b>";
const FRIEND_INVITE_TEMPLATE = "<b>$sender$</b> wants to be your friend.";

export async function getNotificationById(
  notificationId: string
): Promise<Notification | null> {
  return await datasource
    .getRepository(Notification)
    .findOne({ where: { id: notificationId } });
}

export async function getOwnNotifications(
  receiverId: string
): Promise<Notification[] | null> {
  return await datasource
    .getRepository(Notification)
    .find({ where: { receiverId } });
}

export async function notifyChallengeInvitation(
  senderId: string,
  receiverId: string,
  challengeId: string
): Promise<boolean> {
  const [{ firstName }] = await getUsersById([senderId]);
  const { name } = (await getChallengeById(challengeId)) ?? { name: "" };
  const content = CHALLENGE_INVITE_TEMPLATE.replace(
    "$sender$",
    firstName
  ).replace("$challengeName$", name);

  await datasource
    .getRepository(Notification)
    .save({ content, type: "challenge_invitation", senderId, receiverId });

  return true;
}

export async function deleteFriendInvitation(
  senderId: string,
  receiverId: string
): Promise<boolean> {
  await datasource
    .getRepository(Notification)
    .delete({ receiverId, senderId, type: "friend_invitation" });
  return true;
}

export async function notifyFriendInvitation(
  senderId: string,
  receiverId: string
): Promise<boolean> {
  const [{ firstName }] = await getUsersById([senderId]);
  const content = FRIEND_INVITE_TEMPLATE.replace("$sender$", firstName);

  await datasource
    .getRepository(Notification)
    .save({ content, type: "friend_invitation", senderId, receiverId });

  return true;
}

export async function deleteNotifications(
  notificationId: string[]
): Promise<boolean[]> {
  return await Promise.all(
    notificationId.map(async (id) => {
      const { affected } = await datasource
        .getRepository(Notification)
        .delete(id);
      if (affected === 0)
        throw new ApolloError("Notification not found", "NOT_FOUND");
      return true;
    })
  );
}