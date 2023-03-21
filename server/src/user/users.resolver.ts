import User, { hashPassword, UserInput, verifyPassword } from './Users';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import datasource from '../db';
import { ApolloError } from 'apollo-server-errors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export interface JWTPayload {
  userId: number 
}

export interface ContextType {
  req: express.Request
  res: express.Response
  currentUser?: User
}

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") {email, password}: UserInput): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return await datasource.getRepository(User).save({email, hashedPassword});
  }

  @Mutation(() => String)
  async login(
    @Arg("data"){email, password}: UserInput,
    @Ctx() {res}: ContextType
  ): Promise<string> {
    const user = await datasource.getRepository(User).findOneBy({email});

    if (user === null || !(await verifyPassword(password, user.hashedPassword)))
      throw new ApolloError("Invalid Credentials", "INVALID_CREDS");
    
    const token = jwt.sign({userId: user.id}, env.JWT_PRIVATE_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });
    return token;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() {res}: ContextType): Promise<boolean> {
    res.clearCookie("token");
    return true;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() {currentUser}: ContextType) : Promise<User> {
    return currentUser as User;
  }
}