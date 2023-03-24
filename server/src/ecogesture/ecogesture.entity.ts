import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsString } from "class-validator";

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
