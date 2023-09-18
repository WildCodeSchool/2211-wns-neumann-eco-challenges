import { ApolloError } from "apollo-server";
import { getChallengeById } from "../challenge/challenge.service";
import datasource from "../db";
import { getUserPicture, getUsersById } from "../user/user.service";
import Notification, {
  InvitationType,
  NotificationStatus,
} from "./notification.entity";
import { updateFriendRelationshipStatus } from "../friend/friend.service";
import { updateChallengeParticipationStatus } from "../userChallengesParticipation/userChallengesParticipation.service";

const contentTemplates = {
  friend_invitation: {
    pending: "<b>$sender$</b> wants to be your friend.",
    accepted: "You are now friend with <b>$sender$</b>. 🎉",
    declined: "You declined <b>$sender$</b>'s invitation.😕",
  },
  challenge_invitation: {
    pending:
      "<b>$sender$</b> wants you to join the challenge <b>$challengeName$</b>",
    accepted: "You joined <b>$challengeName$</b>.😁",
    declined: "You refused to join <b>$challengeName$</b>.😕",
  },
};

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
  const notifications = await datasource.getRepository(Notification).find({
    where: { receiverId, canceledBySender: false },
    order: { updatedDate: "DESC" },
  });

  return await Promise.all(
    notifications.map(async (notification) => {
      const picture = await getUserPicture(notification.senderId);
      return {
        ...notification,
        picture,
        content: notification.contentAfterUserResponse ?? notification.content,
      };
    })
  );
}

export async function updateNotificationStatus(
  notificationId: string,
  status: Notification["status"]
): Promise<Notification> {
  const notification = await datasource
    .getRepository(Notification)
    .findOne({ where: { id: notificationId } });

  if (notification == null)
    throw new ApolloError(
      "[updateInvitationStatus] - Notification not found",
      "NOT_FOUND"
    );

  const isInvitiationNotification =
    notification.type != null &&
    ["friend_invitation", "challenge_invitation"].includes(notification.type);

  // Compute content after user response, accept or decline invitation
  if (isInvitiationNotification) {
    notification.status = status;
    const [sender] = await getUsersById([notification.senderId]);
    const challenge =
      notification.challengeId != null
        ? await getChallengeById(notification.challengeId)
        : null;

    if (notification.challengeId != null && challenge == null) {
      throw new ApolloError(
        "[updateNotificationStatus] - Cannot find challenge",
        "NOT_FOUND"
      );
    }

    if (sender == null)
      throw new ApolloError(
        "[updateNotificationStatus] - Cannot find sender user",
        "NOT_FOUND"
      );

    if (notification.type === "friend_invitation")
      await updateFriendRelationshipStatus(
        notification.senderId,
        notification.receiverId,
        notification.status
      );

    if (notification.type === "challenge_invitation")
      await updateChallengeParticipationStatus(
        notification.challengeId as string,
        notification.receiverId,
        notification.status
      );

    notification.contentAfterUserResponse = contentTemplates[
      notification.type as InvitationType
    ][status]
      .replace("$sender$", sender.firstName)
      .replace("$challengeName$", challenge?.name ?? "");
  }
  notification.hasBeenSeen = true;
  await datasource.getRepository(Notification).save(notification);

  // Load content after user response into content.
  // So front always display the right content.
  if (isInvitiationNotification)
    notification.content = notification.contentAfterUserResponse as string;

  return notification;
}

export async function notifyChallengeInvitation(
  senderId: string,
  receiverId: string,
  challengeId: string
): Promise<boolean> {
  const [{ firstName }] = await getUsersById([senderId]);
  const { name } = (await getChallengeById(challengeId)) ?? { name: "" };
  const content = contentTemplates.challenge_invitation.pending
    .replace("$sender$", firstName)
    .replace("$challengeName$", name);

  await datasource.getRepository(Notification).save({
    content,
    type: InvitationType.challenge_invitation,
    senderId,
    status: NotificationStatus.pending,
    receiverId,
    challengeId,
  });

  return true;
}

export async function cancelFriendInvitation(
  senderId: string,
  receiverId: string
): Promise<boolean> {
  const { affected } = await datasource.getRepository(Notification).update(
    {
      senderId,
      receiverId,
      type: InvitationType.friend_invitation,
      status: NotificationStatus.pending,
      canceledBySender: false,
    },
    { canceledBySender: true }
  );

  return affected !== 0;
}

export async function notifyFriendInvitation(
  senderId: string,
  receiverId: string
): Promise<boolean> {
  const [{ firstName }] = await getUsersById([senderId]);
  const content = contentTemplates.friend_invitation.pending.replace(
    "$sender$",
    firstName
  );

  await datasource.getRepository(Notification).save({
    content,
    type: InvitationType.friend_invitation,
    senderId,
    receiverId,

    status: NotificationStatus.pending,
  });

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
