import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

export default Challenge;
