import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { Quote } from './entities/quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
