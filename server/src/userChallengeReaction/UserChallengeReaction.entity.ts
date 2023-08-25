import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import Challenge from "../challenge/challenge.entity";
import User from "../user/user.entity";

export enum ReactionEmojis {
  "heart" = "heart",
  "laughing" = "laughing",
  "suprised" = "suprised",
  "sad" = "sad",
  "rocket" = "rocket",
  "thumb_up" = "thumb_up",
  "flame" = "flame",
}

export const ReactionEmojisIcons = [
  {
    reactionEmoji: ReactionEmojis.thumb_up,
    icon: "👍",
  },
  {
    reactionEmoji: ReactionEmojis.laughing,
    icon: "😂",
  },
  {
    reactionEmoji: ReactionEmojis.heart,
    icon: "❤️",
  },
  {
    reactionEmoji: ReactionEmojis.suprised,
    icon: "😮",
  },
  {
    reactionEmoji: ReactionEmojis.sad,
    icon: "🥲",
  },
  {
    reactionEmoji: ReactionEmojis.rocket,
    icon: "🚀",
  },
  {
    reactionEmoji: ReactionEmojis.flame,
    icon: "🔥",
  },
];

@ObjectType()
export class ReactionEmojisWithIcon {
  @Field(() => ReactionEmojis)
  reactionEmoji: ReactionEmojis;

  @Field()
  icon: string;
}

registerEnumType(ReactionEmojis, {
  name: "ReactionEmojis",
});

@Entity()
@ObjectType()
@Unique("unique_reaction", ["userId", "challengeId"])
class UserChallengeReaction {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => ReactionEmojis)
  @Column({ enum: ReactionEmojis })
  content: ReactionEmojis;

  @Field(() => User)
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
