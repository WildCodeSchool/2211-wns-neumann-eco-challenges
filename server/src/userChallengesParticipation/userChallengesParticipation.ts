import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

export default UserChallengesParticipation;