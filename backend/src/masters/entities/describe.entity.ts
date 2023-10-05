import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
@Schema()
export class Describe extends Document {
  @ApiProperty({ example: "Man" })
  @Prop({ required: true })
  label: string;

  @ApiProperty({ example: "man" })
  @Prop({ required: true })
  value: string;
}

export const DescribeSchema = SchemaFactory.createForClass(Describe);
