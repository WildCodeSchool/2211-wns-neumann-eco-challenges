import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Challenge from "../challenge/challenge.entity";
import Ecogesture from "../ecogesture/ecogesture.entity";
import User from "../user/user.entity";

@Entity()
class UserChallengeEcogestures {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  challengeId: string;

  @Column()
  userId: string;

  @Column()
  ecogestureId: string;

  @Column()
  proof: string;

  @Column()
  completionDate: Date;

  @Column()
  reward: number;

  @ManyToOne(() => User, (u) => u.userChallengeEcogestures, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Challenge, (c) => c.userChallengeEcogestures, {
    onDelete: "CASCADE",
  })
  challenge: Challenge;

  @ManyToOne(() => Ecogesture, (e) => e.userChallengeEcogestures, {
    onDelete: "CASCADE",
  })
  ecogesture: Ecogesture;
}

export default UserChallengeEcogestures;
