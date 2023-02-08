import User, { hashPassword, UserInput, verifyPassword } from '../entity/users';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import datasource from '../db';
import { ApolloError } from 'apollo-server-errors';

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data"){email, password}: UserInput): Promise<User> {
    const hashedPassword = await hashPassword(password)
    return await datasource.getRepository(User).save({email, hashedPassword})
  }

  @Mutation(() => Boolean)
  async login(@Arg("data"){email, password}: UserInput): Promise<boolean> {
    const user = await datasource.getRepository(User).findOneBy({email})
    if (user === null || !(await verifyPassword(password, user.hashedPassword)))
    throw new ApolloError("Invalid Credentials", "INVALID_CREDS")
    return true;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users: User[] = await datasource.getRepository(User).find();
    return users;
  }
}