import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
  ) {}
  async create(createResultDto: CreateResultDto) {
    const newResult = this.resultRepository.create(createResultDto);
    const result = await this.resultRepository.save(newResult);
    return result;
  }

  async findAll() {
    return await this.resultRepository.find();
  }

  async findOne(id: number) {
    const found = await this.resultRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `The result with id number ${id} is not found !`,
      );
    }
    return found;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
