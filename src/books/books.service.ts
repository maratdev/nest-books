import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BooksModel } from './model/books.model';
import { Model } from 'mongoose';
import { BookDTO } from './dto/book.dto';
import { IdDto } from './dto/id.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BooksModel.name)
    private readonly booksModel: Model<BooksModel>,
  ) {}

  async getAllBooks(): Promise<BooksModel[]> {
    const allData = await this.booksModel
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    if (!allData || allData.length == 0) {
      throw new NotFoundException();
    }
    return allData;
  }

  async createBook(book: BookDTO): Promise<BooksModel> {
    const createBook = new this.booksModel(book);
    return createBook.save();
  }

  async findBookById({ id }: IdDto): Promise<BooksModel> {
    const findReserveId = await this.booksModel.findById(id);
    if (!findReserveId) throw new NotFoundException(id);
    return findReserveId;
  }

  async updateBookById(
    { id }: IdDto,
    updateReserveDto: UpdateBookDTO,
  ): Promise<BooksModel> {
    await this.findBookById({ id });
    return this.booksModel.findByIdAndUpdate(id, updateReserveDto, {
      new: true,
    });
  }

  async deleteBookById({ id }: IdDto): Promise<void> {
    await this.findBookById({ id });
    return this.booksModel.findByIdAndDelete(id);
  }
}
