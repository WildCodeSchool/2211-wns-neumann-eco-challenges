import { Query, Resolver } from "type-graphql";
import { getNotifications } from "./notification.service";
import Notification from "./notification.entity";

@Resolver(Notification)
export class NotificationResolver {
  @Query(() => [Notification])
  async notifications(): Promise<Notification[]> {
    return await getNotifications();
  }
}