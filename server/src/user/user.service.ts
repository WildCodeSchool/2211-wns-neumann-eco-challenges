import { ApolloError } from "apollo-server";
import datasource from "../db";
import User, { hashPassword, UserInput } from "./user.entity";

export async function getUsers(): Promise<User[]> {
  return await datasource.getRepository(User).find();
}

export async function createUsers(userData: UserInput[]): Promise<User[]> {
  return await Promise.all(
    userData.map(
      async (user) =>
        await datasource.getRepository(User).save({
          ...user,
          hashedPassword: await hashPassword(user.password),
          password: undefined,
        })
    )
  );
}

export async function deleteUsers(userIDs: string[]): Promise<boolean[]> {
  return await Promise.all(
    userIDs.map(async (id) => {
      const { affected } = await datasource.getRepository(User).delete(id);
      if (affected === 0) {
        throw new ApolloError("User not found", "NOT_FOUND");
      }
      return true;
    })
  );
}
