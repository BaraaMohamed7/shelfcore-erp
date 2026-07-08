import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async login(loginDto: LoginDto) {
    return this.usersService.findOneByEmail(loginDto.email);
  }
}
