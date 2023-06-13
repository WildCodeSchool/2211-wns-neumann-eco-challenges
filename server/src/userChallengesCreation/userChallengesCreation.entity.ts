import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "../user/user.entity";

@Entity()
class UserChallengesCreation {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  challengeId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (u) => u.userChallengesCreation, {
    onDelete: "CASCADE",
  })
  user: User;
}

export default UserChallengesCreation;
