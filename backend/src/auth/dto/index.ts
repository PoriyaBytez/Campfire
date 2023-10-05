import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginRequest {
  @ApiProperty({ name: "email", required: true })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ name: "password", required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class RefreshTokenRequest {
  @ApiProperty({ name: "refreshToken", required: true })
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class ValidateEmailRequest {
  @ApiProperty({ name: "email", required: true })
  @IsEmail({}, { message: "Please enter valid email." })
  readonly email: string;
}
