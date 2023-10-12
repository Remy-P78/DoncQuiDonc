import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Member } from 'src/member/entities/member.entity';
import { GetMember } from 'src/auth/get-member.decorator';

@Controller('result')
@ApiTags('Result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createResultDto: CreateResultDto, @GetMember() member: Member) {
    return this.resultService.create(createResultDto, member);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
