import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('jwt')
export class JwtType {
  @Field()
  username: string;
}
