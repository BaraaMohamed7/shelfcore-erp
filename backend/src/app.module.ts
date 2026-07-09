import { SecurityModule } from './common/security/security.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
