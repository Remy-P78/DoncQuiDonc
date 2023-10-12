import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
