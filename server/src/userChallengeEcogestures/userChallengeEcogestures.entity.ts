import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class UserChallengeEcogestures {
  @PrimaryGeneratedColumn()
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
}

export default UserChallengeEcogestures;