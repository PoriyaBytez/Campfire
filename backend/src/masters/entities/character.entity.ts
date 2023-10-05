import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
@Schema()
export class Character extends Document {
  @ApiProperty({ example: "" })
  @Prop({ required: true })
  character: string;

  @ApiProperty({ example: "" })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: "" })
  @Prop({ required: false })
  gender?: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
