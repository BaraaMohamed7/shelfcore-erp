import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SecurityModule } from '../common/security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  providers: [AuthService, TokensService],
  controllers: [AuthController],
  imports: [UsersModule, SecurityModule, JwtModule.register({})],
})
export class AuthModule {}
