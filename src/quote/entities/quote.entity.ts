import { Author } from "src/author/entities/author.entity";
import { Member } from "src/member/entities/member.entity";
import { Theme } from "src/theme/entities/theme.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'boolean' })
  valide: boolean;

  @Column({ type: 'integer' })
  id_author: number;

  @Column({ type: 'integer' })
  id_theme: number;

  @ManyToOne(() => Author, (author) => author.quote, {
    eager: true,
  })
  @JoinColumn({ name: 'id_author' })
  author: Author;

  @ManyToOne(() => Theme, (theme) => theme.quote, {
    eager: true,
  })
  @JoinColumn({ name: 'id_theme' })
  theme: Theme;

  // @ManyToMany(() => Member, (member) => member.favoriteQuotes)
  // @JoinTable()
  // favoritedBy: Member[];

  // @ManyToMany(() => Comment, (comment) => comment.quote)
  // comments: Comment[];
}
