import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Challenge from "../challenge/challenge.entity";
import User from "../user/user.entity";

@Entity()
class UserChallengesParticipation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  challengeId: string;

  @Column()
  userId: string;

  @Column({default: "pending"})
  status: "pending" | "accepted" | "declined";

  @ManyToOne(() => Challenge, (c) => c.UserChallengesParticipation, { onDelete: "CASCADE" })
  challenge: Challenge

  @ManyToOne(() => User, (u) => u.UserChallengesParticipation, { onDelete: "CASCADE" })
  user: User
}

export default UserChallengesParticipation;