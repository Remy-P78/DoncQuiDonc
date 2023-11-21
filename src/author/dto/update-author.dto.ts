import { ApiProperty } from "@nestjs/swagger";


export class UpdateAuthorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  biography: string;

  @ApiProperty()
  id_photo?: number;
}
