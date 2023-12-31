import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  id_role: number;

  @ApiProperty()
  id_photo: number;
}
