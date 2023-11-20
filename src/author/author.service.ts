import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    private http: HttpService,
  ) {}

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    const found = await this.authorRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `The author wich id number is ${id} is not found !`,
      );
    }
    return found;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const authorToRemove = await this.findOne(id);
    if (!authorToRemove) {
      throw new Error(`The author with id number: ${id} is not found !`);
    }
    await this.authorRepository.remove(authorToRemove);
    return { message: `The author ${authorToRemove.name} is deleted !` };
  }

  async create(createAuthorDto: CreateAuthorDto) {
   
    try {
      const recaptchaResponse = await this.verifyRecaptcha(
        createAuthorDto.recaptchaToken,
      );

      if (recaptchaResponse.success === true) {
        const newAuthor = this.authorRepository.create(
          this.processAuthor(createAuthorDto),
        );
        const result = await this.authorRepository.save(newAuthor);
        return result;
      } else {
        console.error('La vérification reCAPTCHA a échoué.');
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification reCAPTCHA:', error);
      return null;
    }
  }

  //Vérification captcha
  async verifyRecaptcha(recaptchaToken: string): Promise<any> {
    const response = await this.http
      .get(        
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_CAPTCHA}&response=${recaptchaToken}`,
      )
      .pipe(map((res) => res.data))
      .toPromise();

    return response;
  }

  //destructuration du dto et sortie du createAuthorDto qui n'a pas de propriétés author
  processAuthor(dto) {
    const { recaptchaToken, ...author } = dto;
    return { ...author.author };
  }
}
