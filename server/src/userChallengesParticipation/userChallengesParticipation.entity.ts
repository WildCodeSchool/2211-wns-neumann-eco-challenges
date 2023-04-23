import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Challenge from "../challenge/challenge.entity";
import User from "../user/user.entity";

@Entity()
class UserChallengesParticipation {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  challengeId: string;

  @Column()
  userId: string;

  @Column({ default: "pending" })
  status?: "pending" | "accepted" | "declined";

  @ManyToOne(() => Challenge, (c) => c.userChallengesParticipation, {
    onDelete: "CASCADE",
  })
  challenge: Challenge;

  @ManyToOne(() => User, (u) => u.userChallengesParticipation, {
    onDelete: "CASCADE",
  })
  user: User;
}

export default UserChallengesParticipation;
