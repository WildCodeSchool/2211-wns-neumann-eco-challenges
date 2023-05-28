import { Field } from "type-graphql/dist/decorators/Field";
import { InputType } from "type-graphql/dist/decorators/InputType";

@InputType()
export class NotificationInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field({ nullable: true })
  data?: string;
}
