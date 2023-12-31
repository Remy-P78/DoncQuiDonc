import { Member } from "src/member/entities/member.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'integer' })
  points: number;

  @Column({ type: 'integer' })
  id_member: number;

  @ManyToOne(() => Member, (member) => member.result)
  @JoinColumn({ name: 'id_member' })
  member: Member;
}
