import { Member } from "src/member/entities/member.entity";
import { Quote } from "src/quote/entities/quote.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToMany(() => Quote, (quote) => quote.comments)
  @JoinTable()
  quote: Quote;

  @ManyToMany(() => Member, (member) => member.comments)
  @JoinTable()
  member: Member;
}
