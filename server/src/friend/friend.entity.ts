import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

@Entity()
@ObjectType()
class Friend {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  friendId: string;

  @Field()
  @Column({ default: "pending" })
  status: "accepted" | "pending" | "declined";

  @ManyToOne(() => User, (user) => user.friends, { onDelete: "CASCADE" })
  user: User[];
}
export default Friend;

type RelationshipStatus = Friend["status"] | "none";
@ObjectType()
export class FriendRelationship {
  @Field(() => User)
  friend: User;

  @Field()
  status: RelationshipStatus;
}
