import { Field, InputType, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import Ecogesture from "../ecogesture/ecogesture.entity";
import User from "../user/user.entity";
import UserChallengeEcogestures from "../userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengesCreation from "../userChallengesCreation/userChallengesCreation.entity";
import UserChallengesParticipation from "../userChallengesParticipation/userChallengesParticipation";

@Entity()
@ObjectType()
class Challenge {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id?: string;

  @Column({ length: 50, type: "varchar", nullable: true })
  @Field()
  name: string;

  @Column({ default: false })
  @Field()
  status?: boolean;

  @Column({ type: "timestamptz", nullable: true })
  @Field()
  startingDate: Date;

  @Column({ type: "timestamptz", nullable: true })
  @Field()
  endingDate: Date;

  @OneToMany(() => Ecogesture, (ecogesture) => ecogesture.challenge)
  ecogesture: Ecogesture[];

  @ManyToOne(() => User, (user) => user.challenge, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => UserChallengeEcogestures, (challengeEcogesture) => challengeEcogesture.challenge)
  userChallengeEcogestures: UserChallengeEcogestures[];

  @OneToMany(() => UserChallengesCreation, (challengeCreation) => challengeCreation.challenge)
  UserChallengesCreation: UserChallengesCreation[];

  @OneToMany(() => UserChallengesParticipation, (challengeParticipation) => challengeParticipation.challenge)
  UserChallengesParticipation: UserChallengesParticipation[];
}

@InputType()
export class ChallengeInput {
  @Field()
  @MaxLength(50)
  @MinLength(5)
  name: string;

  @Field()
  status?: boolean;

  @Field()
  startingDate: Date;

  @Field()
  endingDate: Date;
}

@InputType()
export class ChallengeUpdateInput {
  @Field({ nullable: true })
  @MaxLength(50)
  @MinLength(5)
  name?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field({ nullable: true })
  startingDate?: Date;

  @Field({ nullable: true })
  endingDate?: Date;
}

export default Challenge;
