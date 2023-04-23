import { IsEmail, IsString, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import argon2, { hash, verify } from "argon2";
import Challenge from "../challenge/challenge.entity";
import UserChallengeEcogestures from "../userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengesCreation from "../userChallengesCreation/userChallengesCreation.entity";
import UserChallengesParticipation from "../userChallengesParticipation/userChallengesParticipation.entity";

@Entity()
@ObjectType()
class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id?: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  // One user can realize many ecogestures from a challenge
  @OneToMany(
    () => UserChallengeEcogestures,
    (challengeEcogesture) => challengeEcogesture.user
  )
  userChallengeEcogestures: UserChallengeEcogestures[];

  // One user can create many challenges
  @OneToMany(
    () => UserChallengesCreation,
    (challengeCreation) => challengeCreation.user
  )
  userChallengesCreation: UserChallengesCreation[];

  // One user can participate to many challenges
  @OneToMany(
    () => UserChallengesParticipation,
    (challengeParticipation) => challengeParticipation.user
  )
  userChallengesParticipation: UserChallengesParticipation[];
}

@InputType()
export class UserInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
};

export async function hashPassword(plain: string): Promise<string> {
  return await hash(plain, hashingOptions);
}

export async function verifyPassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return await verify(hashed, plain, hashingOptions);
}

export default User;
