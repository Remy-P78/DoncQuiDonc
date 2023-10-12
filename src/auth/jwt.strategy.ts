import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {
    super({
      secretOrKey: 'cestpasunecourse',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
  async validate(payload: any): Promise<Member> {
    console.log('validate');
    const { username } = payload;
    const member: Member = await this.memberRepository.findOneBy({ username });

    if (!member) throw new UnauthorizedException(
      'Membre non reconnu. Veuillez vous connecter.',
    );
    return member;
  }
}
