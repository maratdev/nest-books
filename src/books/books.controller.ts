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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';
import { IdDto } from './dto/id.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { Roles } from '../users/decorators/roles.decorator';
import { RoleTypes } from '../users/types/user.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../users/guards/roles.guard';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
@UseGuards(AuthGuard('jwt-refresh'), RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return this.booksService.getAllBooks();
  }

  @Roles(RoleTypes.Admin)
  @Post()
  async create(@Body() dto: BookDTO) {
    return this.booksService.createBook(dto);
  }

  @Get(':id')
  async findOne(@Param() id: IdDto) {
    return this.booksService.findBookById(id);
  }

  @Roles(RoleTypes.Admin)
  @Put(':id')
  async update(@Param() id: IdDto, @Body() dto: UpdateBookDTO) {
    return this.booksService.updateBookById(id, dto);
  }

  @Roles(RoleTypes.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param() id: IdDto) {
    await this.booksService.deleteBookById(id);
  }
}
