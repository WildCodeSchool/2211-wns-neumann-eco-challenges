import { ApolloError } from "apollo-server-errors";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  deleteNotifications,
  getOwnNotifications,
  updateNotificationStatus,
} from "./notification.service";
import Notification, {
  InvitationType,
  NotificationStatus,
} from "./notification.entity";
import { ContextType } from "../user/user.resolver";
import datasource from "../db";

@Resolver(Notification)
export class NotificationResolver {
  @Authorized()
  @Query(() => [Notification])
  async getOwnNotifications(
    @Ctx() { currentUser }: ContextType
  ): Promise<Notification[] | null> {
    if (currentUser == null)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await getOwnNotifications(currentUser.id);
  }

  @Authorized()
  @Mutation(() => Notification)
  async updateNotificationStatusBySenderReceiverType(
    @Arg("senderId") senderId: string,
    @Arg("receiverId") receiverId: string,
    @Arg("type") type: InvitationType,
    @Arg("status", () => NotificationStatus)
    status: Notification["status"],
    @Arg("statusFilter", () => NotificationStatus, { nullable: true })
    statusFilter?: Notification["status"],
    @Arg("challengeId", { nullable: true }) challengeId?: string
  ): Promise<Notification> {
    const notification = await datasource.getRepository(Notification).findOne({
      where: {
        senderId,
        receiverId,
        type,
        challengeId,
        status: statusFilter,
        canceledBySender: false,
      },
    });
    if (notification == null)
      throw new ApolloError("Notification not found", "NOT_FOUND");

    return await updateNotificationStatus(notification.id, status);
  }

  @Authorized()
  @Mutation(() => Notification)
  async updateNotificationStatus(
    @Arg("notificationId") notificationId: string,
    @Arg("status", () => NotificationStatus)
    status: Notification["status"]
  ): Promise<Notification> {
    return await updateNotificationStatus(notificationId, status);
  }

  @Mutation(() => [Boolean])
  async deleteNotifications(
    @Arg("id", () => [String]) id: string[]
  ): Promise<boolean[]> {
    return await deleteNotifications(id);
  }
}
