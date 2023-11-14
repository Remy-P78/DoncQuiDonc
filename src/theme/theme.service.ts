import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme) private themeRepository: Repository<Theme>,
  ) {}

  async findAll() {
    return await this.themeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} theme`;
  }
}
