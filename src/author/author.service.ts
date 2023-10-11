import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>
  ){}
  async create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    const result = await this.authorRepository.save(newAuthor);
    return result;
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    const found = await this.authorRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `The author wich id number is ${id} is not found !`,
      );
    }
    return found;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const authorToRemove = await this.findOne(id);
    if (!authorToRemove) {
      throw new Error(
        `The author with id number: ${id} is not found !`,
      );
    }
    await this.authorRepository.remove(authorToRemove);
    return { message: `The author ${authorToRemove.name} is deleted !` };
  }
}
