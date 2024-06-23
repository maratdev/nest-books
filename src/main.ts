import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { STATUS } from './config/constants/default';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('DEFAULT_PORT');
  await app.listen(port || STATUS.DEFAULT_PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
