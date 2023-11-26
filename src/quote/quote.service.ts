import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
  ) {}

  async create(createQuoteDto: CreateQuoteDto) {
    const newQuote = this.quoteRepository.create(createQuoteDto);
    const result = await this.quoteRepository.save(newQuote);
    return result;
  }

  async findAll() {
    return await this.quoteRepository.find();
  }

  async findOne(id: number) {
    const found = await this.quoteRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `The quote with id number ${id} is not found !`,
      );
    }
    return found;
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    await this.quoteRepository.update(id, updateQuoteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const quoteToRemove = await this.findOne(id);
    if (!quoteToRemove) {
      throw new Error(`The quote with id number: ${id} is not found !`);
    }
    await this.quoteRepository.remove(quoteToRemove);
    return { message: `The quote ${id} is deleted !` };
  }

  async findValidQuotes() {
    const validQuotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .where('quote.valide = :valide', { valide: true })
      .getMany();

    return validQuotes;
  }

  async findUnvalidQuotes() {
    const unvalidQuotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .where('quote.valide = :valide', { valide: false })
      .getMany();

    return unvalidQuotes;
  }
}
