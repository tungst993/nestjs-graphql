import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('user')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
