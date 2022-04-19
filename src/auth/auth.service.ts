import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      id: uuid(),
      username,
      password: hashedPassword,
      accessToken: null,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        throw new ConflictException('Username already axists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      user.accessToken = accessToken;
      return user;
    } else {
      throw new UnauthorizedException('Login fail');
    }
  }
}
