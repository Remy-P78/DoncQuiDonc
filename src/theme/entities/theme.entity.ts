import { Quote } from "src/quote/entities/quote.entity";
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Quote, (quote) => quote.theme)
  @JoinColumn({ name: 'id_theme' })
  quote: Quote;
}
