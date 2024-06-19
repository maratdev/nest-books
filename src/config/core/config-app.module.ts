import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from '../constants/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      load: [configurations],
    }),
  ],
})
export class ConfigAppModule {}
