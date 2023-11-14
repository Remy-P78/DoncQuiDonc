import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { PhotoModule } from './photo/photo.module';
import { Author } from './author/entities/author.entity';
import { Photo } from './photo/entities/photo.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { ThemeModule } from './theme/theme.module';
import { Theme } from './theme/entities/theme.entity';
import { MemberModule } from './member/member.module';
import { Member } from './member/entities/member.entity';
import { ResultModule } from './result/result.module';
import { Result } from './result/entities/result.entity';
import { QuoteModule } from './quote/quote.module';
import { Quote } from './quote/entities/quote.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Author, Comment, Member, Quote, Photo, Result, Role, Theme],
      synchronize: false,
      logging: true,
    }),
    AuthorModule,
    PhotoModule,
    RoleModule,
    ThemeModule,
    MemberModule,
    ResultModule,
    QuoteModule,
    CommentModule,
    AuthModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
