import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCountryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  multi_digit_code: string;

  @ApiProperty()
  @IsString()
  initial: string;
}
