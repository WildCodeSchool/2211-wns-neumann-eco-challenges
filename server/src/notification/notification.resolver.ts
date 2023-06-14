import { ApolloError } from "apollo-server-errors";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { deleteNotifications, getOwnNotifications } from "./notification.service";
import Notification from "./notification.entity";
import { ContextType } from "../user/user.resolver";

@Resolver(Notification)
export class NotificationResolver {
  @Authorized()
  @Query(() => [Notification])
  async getOwnNotifications(
    @Ctx() { currentUser }: ContextType,
  ): Promise<Notification[] | null> {
    if (currentUser == null)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await getOwnNotifications(currentUser.id);
  }

  @Mutation(() => [Boolean])
  async deleteNotifications(
    @Arg("id", () => [String]) id: string[]
  ): Promise<boolean[]> {
    return await deleteNotifications(id);
  }
}