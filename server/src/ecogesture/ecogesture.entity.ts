import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

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
  name: string;

  @Field()
  difficulty: number;

  @Field()
  reward: number;

  @Field()
  isProofNeeded?: boolean;
}
