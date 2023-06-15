import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import User from "../user/user.entity";
import { ApolloError } from "apollo-server-errors";
import Friend, { FriendRelationship } from "./friend.entity";
import {
  deleteFriend,
  getFriends,
  updateFriendRelationship,
} from "./friend.service";
import { ContextType } from "../user/user.resolver";

@Resolver(() => Friend)
export class FriendResolver {
  @Authorized()
  @Query(() => [FriendRelationship])
  async getFriends(
    @Ctx() { currentUser }: ContextType,
    @Arg("onlyFriends", () => Boolean, { defaultValue: true })
    onlyFriends: boolean,
    @Arg("status", () => String, { nullable: true })
    status?: Friend["status"]
  ): Promise<FriendRelationship[]> {
    if (currentUser === null || currentUser === undefined)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await getFriends(currentUser.id, onlyFriends, status);
  }

  @Authorized()
  @Mutation(() => User)
  async updateFriendRelationship(
    @Ctx() { currentUser }: ContextType,
    @Arg("friendId") friendId: string
  ): Promise<User> {
    if (currentUser === null || currentUser === undefined)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await updateFriendRelationship(currentUser.id, friendId);
  }

  @Authorized()
  @Mutation(() => User)
  async deleteFriend(
    @Arg("friendId") friendId: string,
    @Ctx() { currentUser }: ContextType
  ): Promise<User> {
    if (currentUser === null || currentUser === undefined)
      throw new ApolloError("Cannot get user id", "USER_CONTEXT_ERROR");
    return await deleteFriend(currentUser.id, friendId);
  }
}
