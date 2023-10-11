import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  biography: string;

  @ApiProperty()
  id_photo?: number;
}
