import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class DomainRequest {
  @ApiProperty({ name: "domainName", required: true, example: "gmail.com" })
  @IsString()
  @IsNotEmpty()
  readonly domainName: string;

  @ApiProperty({ name: "isWhitelist", required: false, default: false })
  @IsBoolean()
  isWhitelist?: boolean;

  @ApiProperty({ name: "isActive", required: false, default: false })
  @IsBoolean()
  isActive?: boolean;
}

export class FetchDomainRequest {
  @ApiProperty({ name: "id", required: false })
  @IsString()
  readonly id?: string;

  @ApiProperty({ name: "domainName", required: false, example: "gmail.com" })
  @IsString()
  readonly domainName?: string;
}
