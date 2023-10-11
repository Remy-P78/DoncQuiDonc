import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    const newMember = this.memberRepository.create(createMemberDto);
    const result = await this.memberRepository.save(newMember);
    return result;
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  async findOne(id: number) {
     const found = await this.memberRepository.findOneBy({ id });
     if (!found) {
       throw new NotFoundException(
         `The member with id number ${id} is not found !`,
       );
     }
     return found;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.memberRepository.update(id, updateMemberDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const memberToRemove = await this.findOne(id);
    if (!memberToRemove) {
      throw new Error(`The member with id number: ${id} is not found !`);
    }
    await this.memberRepository.remove(memberToRemove);
    return { message: `The member ${id} is deleted !` };
  }
}
