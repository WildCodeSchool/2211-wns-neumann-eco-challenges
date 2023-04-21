import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Challenge from "../challenge/challenge.entity";
import User from "../user/user.entity";

@Entity()
class UserChallengesCreation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  challengeId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Challenge, (c) => c.UserChallengesCreation, { onDelete: "CASCADE" })
  challenge: Challenge

  @ManyToOne(() => User, (u) => u.UserChallengesCreation, { onDelete: "CASCADE" })
  user: User
}

export default UserChallengesCreation;