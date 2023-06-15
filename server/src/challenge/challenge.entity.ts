import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import UserChallengeEcogestures, {
  UserChallengeScore,
} from "../userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengesParticipation from "../userChallengesParticipation/userChallengesParticipation.entity";
import { ChallengeEcogestures } from "../challengeEcogestures/challengeEcogestures.entity";
import User from "../user/user.entity";
import Ecogesture from "../ecogesture/ecogesture.entity";
import Category from "../category/category.entity";
import Notification from "../notification/notification.entity";

@Entity()
@ObjectType()
class Challenge {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ length: 50, type: "varchar", nullable: true })
  @Field()
  name: string;

  @Column({ default: false })
  @Field()
  status?: boolean;

  @Column({ type: "timestamptz", nullable: true })
  @Field()
  startingDate: Date;

  @Column({ type: "timestamptz", nullable: true })
  @Field()
  endingDate: Date;

  // One challenge can have many ecogestures
  @OneToMany(() => ChallengeEcogestures, (ce) => ce.challenge, {
    onDelete: "CASCADE",
  })
  challengeEcogestures: ChallengeEcogestures[];

  // One challenge can have many realizations (to replae)
  @OneToMany(() => UserChallengeEcogestures, (uce) => uce.challenge, {
    onDelete: "CASCADE",
  })
  userChallengeEcogestures: UserChallengeEcogestures[];

  // One challenge can have multiple participation
  @OneToMany(
    () => UserChallengesParticipation,
    (challengeParticipation) => challengeParticipation.challenge,
    {
      onDelete: "CASCADE",
    }
  )
  userChallengesParticipation: UserChallengesParticipation[];
}

@ObjectType()
export class ChallengeDetails {
  @Field(() => Challenge)
  challenge: Challenge;

  @Field(() => [UserChallengeScore])
  challengersScore: UserChallengeScore[];

  @Field(() => [Ecogesture])
  ecogestures: Ecogesture[];

  @Field(() => Int)
  totalEcogesturesScore: number;

  @Field(() => [User])
  challengers: User[];

  @Field(() => [UserChallengeEcogestures])
  userEcogestures: UserChallengeEcogestures[];

  @Field(() => [Category])
  categories: Category[];
}

@InputType()
export class ChallengeInput {
  @Field()
  @MaxLength(50)
  @MinLength(5)
  name: string;

  @Field()
  status?: boolean;

  @Field()
  startingDate: Date;

  @Field()
  endingDate: Date;
}

@InputType()
export class ChallengeCreationInput {
  @Field(() => ChallengeInput)
  challenge: ChallengeInput;

  @Field(() => [String])
  ecogesturesId: string[];

  @Field(() => [String])
  challengersId: string[];
}

@InputType()
export class ChallengeUpdateInput {
  @Field({ nullable: true })
  @MaxLength(50)
  @MinLength(5)
  name?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field({ nullable: true })
  startingDate?: Date;

  @Field({ nullable: true })
  endingDate?: Date;
}

export default Challenge;
