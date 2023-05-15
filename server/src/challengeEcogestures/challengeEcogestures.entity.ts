import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Challenge from "../challenge/challenge.entity";
import Ecogesture from "../ecogesture/ecogesture.entity";

@Entity()
export class ChallengeEcogestures {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  challengeId: string;

  @Column()
  ecogestureId: string;

  // Many ecogesture are linked to one challenge
  @ManyToOne(() => Challenge, (c) => c.challengeEcogestures)
  challenge: Challenge;

  // Many ecogestures are linked to challenge ecogestures
  @ManyToOne(() => Ecogesture, (e) => e.challengeEcogestures)
  ecogesture: Ecogesture;
}
