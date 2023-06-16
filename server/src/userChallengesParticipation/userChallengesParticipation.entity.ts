import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import Challenge from "../challenge/challenge.entity";
import User from "../user/user.entity";

@Entity()
@ObjectType()
class UserChallengesParticipation {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Field()
  @Column()
  challengeId: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column({ default: "pending" })
  status: "pending" | "accepted" | "declined";

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Challenge, (c) => c.userChallengesParticipation, {
    onDelete: "CASCADE",
  })
  @Field(() => Challenge, { nullable: true })
  challenge: Challenge;

  @ManyToOne(() => User, (u) => u.userChallengesParticipation, {
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  user: User;
}

@ObjectType({
  description:
    "Define all the challenges the user participates to. Also contains details such as the user rank, completion percentage",
})
export class UserChallengeParticipationDetails {
  @Field(() => Challenge)
  challenge: Challenge;

  @Field()
  completionPercentage: number;

  @Field()
  rank: number;

  @Field()
  invitedChallengers: number;

  @Field()
  participatingChallengers: number;
}

export default UserChallengesParticipation;
