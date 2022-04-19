import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtType } from './jwt.type';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserType)
  signUp(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.signUp(username, password);
  }

  @Mutation(() => JwtType)
  signIn(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.signIn({ username, password });
  }
}
