import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('author')
@ApiTags('Author') //Titre Swagger
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get('valid')
  // @UseGuards(AuthGuard())
  async findValidAuthors() {
    const validAuthors = await this.authorService.findValidAuthors();
    return validAuthors;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
