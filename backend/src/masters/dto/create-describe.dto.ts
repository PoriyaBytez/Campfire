import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDescribeDto {
  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsString()
  value: string;
}
