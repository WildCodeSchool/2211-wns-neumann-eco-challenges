import User, {
  LoginInput,
  UpdateUserExpoToken,
  UserInput,
  UserProfile,
  verifyPassword,
} from "./user.entity";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import express from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { createUsers, deleteUsers, getUsers } from "./user.service";
import { NotificationInput } from "../notification/notification.entity";
import { Expo } from "expo-server-sdk";
const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
export interface JWTPayload {
  userId: string;
}

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await getUsers();
  }

  @Mutation(() => [User])
  async createUser(
    @Arg("userInputs", () => [UserInput])
    userData: UserInput[]
  ): Promise<User[]> {
    return await createUsers(userData);
  }

  @Mutation(() => [Boolean])
  async deleteUser(
    @Arg("uuid", () => [String]) userIDs: string[]
  ): Promise<boolean[]> {
    return await deleteUsers(userIDs);
  }

  @Authorized()
  @Query(() => UserProfile)
  async getProfile(
    @Ctx() { currentUser: user, res }: ContextType
  ): Promise<UserProfile> {
    // Should not happen
    if (user === undefined)
      throw new ApolloError("Access forbidden", "UNAUTHORIZED");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });
    return { user, token };
  }

  // Login - JWT
  @Mutation(() => UserProfile)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { res }: ContextType
  ): Promise<UserProfile> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (user === null || !(await verifyPassword(password, user.hashedPassword)))
      throw new ApolloError("Invalid Credentials", "INVALID_CREDS");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });
    return { user, token };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: ContextType): Promise<boolean> {
    res.clearCookie("token");
    return true;
  }

  @Query(() => User)
  async profile(@Ctx() { currentUser }: ContextType): Promise<User> {
    return currentUser as User;
  }

  @Mutation(() => User)
  async updateUserExpoToken(
    @Arg("data") data: UpdateUserExpoToken,
    @Ctx() { currentUser }: ContextType
  ): Promise<User> {
    return await datasource
      .getRepository(User)
      .save({ ...currentUser, ...data });
  }

  // Authorize only for admin
  // @Authorized()
  @Mutation(() => Boolean)
  async sendExpoNotification(
    @Arg("userId") userId: string,
    @Arg("notificationPayload", () => NotificationInput, { validate: false })
    notificationPayload: NotificationInput
  ): Promise<boolean> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id: userId } });

    if (user === null || typeof user === "undefined")
      throw new ApolloError("User not found", "NOT_FOUND");

    if (
      user.expoNotificationToken === null ||
      typeof user.expoNotificationToken === "undefined"
    )
      throw new ApolloError("User needs a token first", "EXPO_TOKEN_NOT_FOUND");

    await expo.sendPushNotificationsAsync([
      {
        to: user.expoNotificationToken,
        body: notificationPayload.body,
        title: notificationPayload.title,
        data:
          typeof notificationPayload.data === "string"
            ? JSON.parse(notificationPayload.data)
            : undefined,
      },
    ]);

    return true;
  }
}
