import { Member } from "src/member/entities/member.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Member, (member) => member.role)
  @JoinColumn({ name: 'id_role' })
  member: Member;
}
