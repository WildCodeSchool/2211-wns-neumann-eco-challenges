import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Ecogesture {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  difficulty: string;

  @Field()
  @Column()
  reward: number;

  @Field()
  @Column()
  isProofNeeded: boolean;
}

export default Ecogesture;
