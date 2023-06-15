import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../user/user.entity";
import { Field, ObjectType } from "type-graphql";
import { InputType } from "type-graphql/dist/decorators/InputType";
import Challenge from "../challenge/challenge.entity";

@Entity()
@ObjectType()
export default class Notification {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  senderId: string;

  @Field()
  @Column()
  receiverId: string;

  @Field()
  @CreateDateColumn()
  date: Date;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ default: "pending", nullable: true })
  status: "accepted" | "pending" | "declined";

  @Field()
  @Column({ default: false })
  hasBeenSeen?: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.notifications)
  challenge: Challenge;
}

@InputType()
export class NotificationInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field({ nullable: true })
  data?: string;
}
