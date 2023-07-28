import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Challenge from "../challenge/challenge.entity";
import User from "../user/user.entity";

export type EmojiList = "❤️" | "😂" | "😮" | "🥲" | "🚀" | "👍" | "🔥";

@Entity()
@ObjectType()
class UserChallengeReaction {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  content: EmojiList;

  @ManyToOne(() => User, (user) => user.userChallengeReactions, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field()
  @Column()
  challengeId: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.userChallengeReactions, {
    onDelete: "CASCADE",
  })
  challenge: Challenge;
}
export default UserChallengeReaction;
