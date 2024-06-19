import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BooksDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsString()
  @IsNotEmpty()
  publicationDate: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
