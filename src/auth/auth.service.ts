import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp12(username: string, password: string): Promise<User> {
    const user = this.userRepository.create({
      id: uuid(),
      username,
      password,
    });
    return this.userRepository.save(user);
  }
}
