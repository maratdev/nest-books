import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongodb/mongo.config';
import { ConfigAppModule } from './config/core/config-app.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigAppModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    BooksModule,
    UsersModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
