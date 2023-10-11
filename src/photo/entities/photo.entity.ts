import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'varchar', length: 255 })
  mimetype: string;
}
