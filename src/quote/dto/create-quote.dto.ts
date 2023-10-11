import { ApiProperty } from "@nestjs/swagger";

export class CreateQuoteDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  valide: boolean;

  @ApiProperty()
  id_author: number;

  @ApiProperty()
  id_theme: number;
}
