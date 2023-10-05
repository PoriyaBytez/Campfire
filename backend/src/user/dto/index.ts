import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly isVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly isWhitelist: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ip: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly timezone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly verificationTimestamp: Date;
}
