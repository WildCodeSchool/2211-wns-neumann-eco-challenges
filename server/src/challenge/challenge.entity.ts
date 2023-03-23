import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MaxLength, MinLength } from "class-validator";

@Entity()
@ObjectType()
class Challenge {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id?: string;

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
