import { ApolloError } from "apollo-server";
import datasource from "../db";
import User from "./user.entity";

export async function getUsers(): Promise<User[]> {
  return await datasource.getRepository(User).find();
}

export async function createUser(userData: User[]): Promise<User[]> {
  return await datasource.getRepository(User).save(userData);
}

export async function deleteUser(userID: string): Promise<boolean> {
  const affected = datasource.getRepository(User).delete(userID);
  if (affected === null || affected === undefined) {
    throw new ApolloError("User not found", "NOT_FOUND");
  } else return true;
}
