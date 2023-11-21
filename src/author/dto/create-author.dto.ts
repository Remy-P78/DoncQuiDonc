import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../entities/author.entity";

export class CreateAuthorDto {
  @ApiProperty()
  author: Author

  @ApiProperty()
  recaptchaToken?: string;  
}
