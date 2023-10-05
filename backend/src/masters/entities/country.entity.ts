import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
@Schema()
export class Country extends Document {
  @ApiProperty({ example: "" })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: "" })
  @Prop({ required: true })
  code: string;

  @ApiProperty({ example: "" })
  @Prop({ required: true })
  multi_digit_code: string;

  @ApiProperty({ example: "" })
  @Prop({ required: true })
  initial: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
