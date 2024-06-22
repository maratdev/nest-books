import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';
import { IdDto } from './dto/id.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return this.booksService.getAllBooks();
  }

  @Post()
  async create(@Body() dto: BookDTO) {
    return this.booksService.createBook(dto);
  }

  @Get(':id')
  async findOne(@Param() id: IdDto) {
    return this.booksService.findBookById(id);
  }

  @Put(':id')
  async updateReserve(
    @Param() objId: IdDto,
    @Body() updateReserveDto: UpdateBookDTO,
  ) {
    return this.booksService.updateBookById(objId, updateReserveDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param() id: IdDto) {
    await this.booksService.deleteBookById(id);
  }
}
