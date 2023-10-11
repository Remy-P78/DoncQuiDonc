import { Photo } from "src/photo/entities/photo.entity";
import { Quote } from "src/quote/entities/quote.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
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
