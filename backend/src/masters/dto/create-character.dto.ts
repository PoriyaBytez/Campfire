import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  character: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  gender?: string;
}
