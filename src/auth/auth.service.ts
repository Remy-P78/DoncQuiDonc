import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { Member } from 'src/member/entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { username, email, password, id_role, id_photo } = createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité member
    const member = this.memberRepository.create({
      username,
      email,
      password: hashedPassword,
      id_role,
      id_photo,
    });

    try {
      // enregistrement de l'entité member
      const createdMember = await this.memberRepository.save(member);
      delete createdMember.password;
      return createdMember;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
