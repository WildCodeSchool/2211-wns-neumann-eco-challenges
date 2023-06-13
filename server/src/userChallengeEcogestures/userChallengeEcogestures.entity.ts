import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import Challenge from "../challenge/challenge.entity";
import Ecogesture from "../ecogesture/ecogesture.entity";
import User from "../user/user.entity";
import { ObjectType } from "type-graphql/dist/decorators/ObjectType";
import { Field } from "type-graphql/dist/decorators/Field";

@Entity()
@ObjectType()
class UserChallengeEcogestures {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  challengeId: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  ecogestureId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  proof: string;

  @Field()
  @CreateDateColumn()
  completionDate: Date;

  @Field()
  @Column()
  reward: number;

  @ManyToOne(() => User, (u) => u.userChallengeEcogestures, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Challenge, (c) => c.userChallengeEcogestures, {
    onDelete: "CASCADE",
  })
  challenge: Challenge;

  @ManyToOne(() => Ecogesture, (e) => e.userChallengeEcogestures, {
    onDelete: "CASCADE",
  })
  ecogesture: Ecogesture;
}

@ObjectType()
export class UserChallengeScore {
  @Field()
  id: string;

  @Field()
  score: number;
}

@ObjectType()
export class UserEcogesturesWithChallengersScore {
  @Field(() => [UserChallengeScore])
  challengersScore: UserChallengeScore[];

  @Field(() => [UserChallengeEcogestures])
  userEcogestures: UserChallengeEcogestures[];
}

export default UserChallengeEcogestures;
