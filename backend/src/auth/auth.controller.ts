import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginResponseDto } from './dtos/login-response.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../common/types/authenticated-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  public async login(@Body() loginDto: LoginDto) {
    const { user, accessToken } = await this.authService.login(loginDto);
    return new LoginResponseDto(user, accessToken);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth()
  getMe(@CurrentUser() currentUser: AuthenticatedUser) {
    return currentUser;
  }
}
