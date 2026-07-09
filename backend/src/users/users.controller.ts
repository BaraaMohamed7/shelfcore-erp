import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/user-response.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  public async createOne(@Body() createUserDto: CreateUserDto) {
    return new UserResponseDto(
      await this.usersService.createOne(createUserDto),
    );
  }
}
