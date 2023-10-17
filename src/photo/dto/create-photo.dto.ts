import { ApiProperty } from "@nestjs/swagger";

export class CreatePhotoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  size: number;
}
