import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class BookDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsDateString() //ISO8601
  publicationDate: Date;

  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
