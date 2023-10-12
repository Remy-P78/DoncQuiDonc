import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/member/entities/member.entity';


export const GetMember = createParamDecorator(
  (_data, ctx: ExecutionContext): Member => {
    const req = ctx.switchToHttp().getRequest();
    return req.user; 
    // c'est toujours la propriété member de req que l'on retourne
  },
);
