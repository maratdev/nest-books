import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'books',
  timestamps: true,
})
export class BooksModel extends Document {
  @Prop({
    required: true,
    maxlength: 150,
  })
  title: string;

  @Prop({
    required: true,
  })
  author: string;

  @Prop({
    required: true,
  })
  publicationDate: Date;

  @Prop({
    required: true,
    type: [String],
  })
  genres: string[];
}

export const BooksSchema = SchemaFactory.createForClass(BooksModel);
