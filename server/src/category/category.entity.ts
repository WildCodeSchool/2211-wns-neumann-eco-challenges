import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ecogesture from "../ecogesture/ecogesture.entity";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export default class Category {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  icon: string;

  @OneToMany(() => Ecogesture, (ecogesture) => ecogesture)
  ecogestures: Ecogesture[];
}
