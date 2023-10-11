import { Photo } from 'src/photo/entities/photo.entity';
import { Quote } from 'src/quote/entities/quote.entity';
import { Result } from 'src/result/entities/result.entity';
import { Role } from 'src/role/entities/role.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'char', length: 60 })
  password: string;

  @Column({ type: 'integer' })
  id_role: number;

  @Column({ type: 'integer' })
  id_photo: number;

  @ManyToOne(() => Role, (role) => role.member, {
    eager: true,
  })
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @OneToOne(() => Photo, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_photo' })
  photo: Photo;

  @OneToMany(() => Result, (result) => result.member)
  @JoinColumn({ name: 'id_member' })
  result: Result;

  @ManyToMany(() => Quote, (quote) => quote.favoritedBy)
  favoriteQuotes: Quote[];

  @ManyToMany(() => Comment, (comment) => comment.member)
  comments: Comment[];
}
