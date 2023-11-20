import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Photo } from "src/photo/entities/photo.entity";
import { Quote } from "src/quote/entities/quote.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: "Le nom de l'auteur ne peut pas être vide" })
  @IsString({
    message: "Le nom de l'auteur doit être une chaîne de caractères",
  })
  @MinLength(2, {
    message: "Le nom de l'auteur doit avoir au moins 2 caractères",
  })
  @MaxLength(60, {
    message: "Le nom de l'auteur ne peut pas dépasser 60 caractères",
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  description: string;

  @Column({ type: 'text' })
  biography: string;

  @Column({ type: 'integer' })
  id_photo: number;

  @OneToOne(() => Photo, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_photo' })
  photo: Photo;

  @OneToMany(() => Quote, (quote) => quote.author)
  @JoinColumn({ name: 'id_author' })
  quote: Quote;
}
