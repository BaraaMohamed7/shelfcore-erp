import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  public async createOne(@Body() createUserDto: CreateUserDto) {
    return new UserResponseDto(
      await this.usersService.createOne(createUserDto),
    );
  }
}
