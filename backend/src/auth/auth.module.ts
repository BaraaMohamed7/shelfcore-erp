import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SecurityModule } from '../common/security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, TokensService, JwtStrategy],
  controllers: [AuthController],
  imports: [UsersModule, SecurityModule, JwtModule.register({})],
})
export class AuthModule {}
