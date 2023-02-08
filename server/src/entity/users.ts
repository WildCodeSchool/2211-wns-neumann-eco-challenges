import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  name: string;
}

export default User;
