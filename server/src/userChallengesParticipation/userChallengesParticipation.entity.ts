import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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
  status?: "pending" | "accepted" | "declined";

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

export default UserChallengesParticipation;
