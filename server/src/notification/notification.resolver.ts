import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { deleteNotifications, getNotifications } from "./notification.service";
import Notification from "./notification.entity";

@Resolver(Notification)
export class NotificationResolver {
  @Query(() => [Notification])
  async notifications(): Promise<Notification[]> {
    return await getNotifications();
  }

  @Mutation(() => [Boolean])
  async deleteNotifications(
    @Arg("id", () => [String]) id: string[]
  ): Promise<boolean[]> {
    return await deleteNotifications(id);
  }
}