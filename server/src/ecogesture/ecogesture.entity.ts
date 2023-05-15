import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsString } from "class-validator";
import Challenge from "../challenge/challenge.entity";
import userChallengeEcogestures from "../userChallengeEcogestures/userChallengeEcogestures.entity";
import { ChallengeEcogestures } from "../challengeEcogestures/challengeEcogestures.entity";

@Entity()
@ObjectType()
class Ecogesture {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id?: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  difficulty: number;

  @Field()
  @Column()
  reward: number;

  @Field()
  @Column({ default: false })
  isProofNeeded?: boolean;

  @OneToMany(() => ChallengeEcogestures, (ce) => ce.ecogesture, {
    onDelete: "CASCADE",
  })
  challengeEcogestures: ChallengeEcogestures[];

  @OneToMany(
    () => userChallengeEcogestures,
    (challengeEcogesture) => challengeEcogesture.ecogesture
  )
  userChallengeEcogestures: userChallengeEcogestures[];
}

export default Ecogesture;

@InputType()
export class EcogestureInput {
  @Field()
  @IsString()
  name: string;

  @Field((type) => Int)
  difficulty: number;

  @Field((type) => Int)
  reward: number;

  @Field((type) => Boolean)
  isProofNeeded?: boolean;
}
