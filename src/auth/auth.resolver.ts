import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './user.type';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => UserType)
  signUp(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.signUp12(username, password);
  }
}
