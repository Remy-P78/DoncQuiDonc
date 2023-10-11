import { ApiProperty } from "@nestjs/swagger";

export class CreateResultDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  points: number;

  @ApiProperty()
  id_member: number;
}
