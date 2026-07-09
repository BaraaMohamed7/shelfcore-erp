/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Module({
  imports: [],
  controllers: [],
  providers: [HashingService],
  exports: [HashingService],
})
export class SecurityModule {}
