import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, SchemaTypes, Types } from "mongoose";
import { Character } from "src/masters/entities/character.entity";
import { Country } from "src/masters/entities/country.entity";
import { Describe } from "src/masters/entities/describe.entity";
import { User } from "src/user/user.entity";
import { OnboardingStep } from "src/utils/constants";

@Schema()
export class Profile extends Document {
  @ApiProperty({ example: "" })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @ApiProperty({ example: "" })
  @Prop({ required: false })
  firstName?: string;

  @ApiProperty({ example: "" })
  @Prop({ type: String, ref: Describe.name, required: false })
  gender?: Types.ObjectId;

  @ApiProperty({ example: "" })
  @Prop({ type: String, ref: Country.name, required: false, default: null })
  country?: Types.ObjectId;

  @ApiProperty({ example: "" })
  @Prop({ required: false, default: "NA" })
  age?: string; // as we have to store not applicable so we have taken as a string.

  @ApiProperty({ example: "" })
  @Prop({ required: false, default: "" })
  adventuresDone?: string;

  @ApiProperty({ example: "" })
  @Prop({ required: false, default: "" })
  topWishes?: string;

  @ApiProperty({ example: "" })
  @Prop({ required: false, default: "" })
  nextAdventures?: string;

  @ApiProperty({ example: "" })
  @Prop({ type: String, ref: Character.name, required: false, default: null })
  character?: Types.ObjectId;

  @ApiProperty({ example: "" })
  @Prop([String])
  images?: string[];

  @Prop({ type: String, required: false, default: OnboardingStep.INITIAL })
  profileStatus?: OnboardingStep;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
