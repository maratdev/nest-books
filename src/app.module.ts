import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongodb/mongo.config';
import { ConfigAppModule } from './config/core/config-app.module';

@Module({
  imports: [
    ConfigAppModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
