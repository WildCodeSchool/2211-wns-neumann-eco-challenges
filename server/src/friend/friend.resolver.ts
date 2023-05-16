import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../user/user.entity";

import Friend from "./firend.entity";
import { addFriend, deleteFriend, getFriends } from "./friend.service";

@Resolver(() => Friend)
export class FriendResolver {
  @Query(() => [User])
  async getFriends(@Arg("userId") userId: string): Promise<User[]> {
    return await getFriends(userId);
  }

  @Mutation(() => User)
  async addFriend(
    @Arg("userId") userId: string,
    @Arg("friendId") friendId: string
  ): Promise<User> {
    return await addFriend(userId, friendId);
  }

  @Mutation(() => User)
  async deleteFriend(
    @Arg("userId") userId: string,
    @Arg("friendId") friendId: string
  ): Promise<User> {
    return await deleteFriend(userId, friendId);
  }
}
