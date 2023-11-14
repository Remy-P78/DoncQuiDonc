import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads',
    }),
    TypeOrmModule.forFeature([Photo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
