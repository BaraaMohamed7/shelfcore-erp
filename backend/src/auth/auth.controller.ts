import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginResponseDto } from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  public async login(@Body() loginDto: LoginDto) {
    const { user, accessToken } = await this.authService.login(loginDto);
    return new LoginResponseDto(user, accessToken);
  }
}
