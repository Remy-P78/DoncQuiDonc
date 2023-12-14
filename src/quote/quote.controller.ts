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
import { AuthGuard } from '@nestjs/passport';

@Controller('quote')
@ApiTags('Quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()  
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @Get()
  // @UseGuards(AuthGuard())
  findAll() {
    return this.quoteService.findAll();
  }

  @Get('valid')
  @UseGuards(AuthGuard())
  async findValidQuotes() {
    const validQuotes = await this.quoteService.findValidQuotes();
    return validQuotes;
  }

  @Get('unvalid')
  // @UseGuards(AuthGuard())
  async findUnvalidQuotes() {
    const unvalidQuotes = await this.quoteService.findUnvalidQuotes();
    return unvalidQuotes;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: number) {
    return this.quoteService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: number, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
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
