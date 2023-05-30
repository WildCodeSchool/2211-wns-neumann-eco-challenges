import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsString } from "class-validator";
import { ChallengeEcogestures } from "../challengeEcogestures/challengeEcogestures.entity";
import UserChallengeEcogestures from "../userChallengeEcogestures/userChallengeEcogestures.entity";
import Category from "../category/category.entity";

@Entity()
@ObjectType()
class Ecogesture {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

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
    () => UserChallengeEcogestures,
    (challengeEcogesture) => challengeEcogesture.ecogesture,
    {
      onDelete: "CASCADE",
    }
  )
  userChallengeEcogestures: UserChallengeEcogestures[];

  // Many ecogestures have one category
  @ManyToOne(() => Category, (category) => category, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Category)
  category: Category;
}

export default Ecogesture;

@InputType()
export class EcogestureInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  difficulty: number;

  @Field(() => Int)
  reward: number;

  @Field(() => Boolean)
  isProofNeeded?: boolean;

  @Field(() => String)
  categoryId: string;
}
