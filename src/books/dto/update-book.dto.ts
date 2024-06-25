import { PartialType } from '@nestjs/mapped-types';
import { BookDTO } from './book.dto';

export class UpdateBookDTO extends PartialType(BookDTO) {}
