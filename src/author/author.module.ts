import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
