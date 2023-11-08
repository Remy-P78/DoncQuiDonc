import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('quote')
@ApiTags('Quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @Get()
  findAll() {
    return this.quoteService.findAll();
  }
  
  @Get('valid')
  async findValidQuotes() {
    const validQuotes = await this.quoteService.findValidQuotes();
    return validQuotes;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.quoteService.remove(+id);
  }

  
}
function GetUser(): (
  target: QuoteController,
  propertyKey: 'create',
  parameterIndex: 1,
) => void {
  throw new Error('Function not implemented.');
}
