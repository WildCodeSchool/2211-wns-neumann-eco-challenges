import User from '../entity/users';
import db from '../db';
import { Query, Resolver } from 'type-graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async usersList(): Promise<User[]> {
    const users: User[] = await db.getRepository(User).find();
    return users;
  }
}
