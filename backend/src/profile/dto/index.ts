import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { Character } from "src/masters/entities/character.entity";
import { Country } from "src/masters/entities/country.entity";
import { Describe } from "src/masters/entities/describe.entity";
import { OnboardingStep } from "src/utils/constants";

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  firstName?: string;

  @ApiProperty({ type: Describe, nullable: true })
  @IsString()
  gender?: string;

  @ApiProperty({ type: Country, nullable: true })
  @IsString()
  country?: string;

  @ApiProperty()
  @IsString()
  age?: string;

  @ApiProperty()
  @IsString()
  adventuresDone?: string;

  @ApiProperty()
  @IsString()
  topWishes?: string;

  @ApiProperty()
  @IsString()
  nextAdventures?: string;

  @ApiProperty({ type: Character, nullable: true })
  @IsString()
  character?: string;

  @ApiProperty({ type: [String], required: false })
  images?: string[];

  @ApiProperty()
  @IsEnum(OnboardingStep)
  profileStatus?: OnboardingStep;
}
