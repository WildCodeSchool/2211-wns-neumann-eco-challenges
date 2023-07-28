import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { InputType } from "type-graphql/dist/decorators/InputType";

export enum NotificationStatus {
  "pending" = "pending",
  "declined" = "declined",
  "accepted" = "accepted",
}

registerEnumType(NotificationStatus, {
  name: "NotificationStatus", // this one is mandatory
});

export enum InvitationType {
  "friend_invitation" = "friend_invitation",
  "challenge_invitation" = "challenge_invitation",
}

registerEnumType(InvitationType, {
  name: "InvitationType", // this one is mandatory
});

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

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedDate?: Date;

  @Field(() => InvitationType, { nullable: true })
  @Column({ nullable: true })
  type?: InvitationType;

  @Field()
  @Column()
  content: string;

  @Column({ nullable: true })
  contentAfterUserResponse?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  status: "accepted" | "pending" | "declined";

  @Field()
  @Column({ default: false })
  hasBeenSeen?: boolean;

  @Column({ nullable: true })
  challengeId?: string;

  @Column({ default: false })
  canceledBySender?: boolean;
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
