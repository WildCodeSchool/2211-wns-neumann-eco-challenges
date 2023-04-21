import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class UserChallengesCreation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  challengeId: string;

  @Column()
  userId: string;
}

export default UserChallengesCreation;