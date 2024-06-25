import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModel, BooksSchema } from './model/books.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BooksModel.name,
        schema: BooksSchema,
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
