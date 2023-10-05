import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";
import { OnboardingStep } from "src/utils/constants";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, name: "email", unique: true })
  email: string;

  @Prop({ required: false, default: "" })
  password?: string;

  @Prop({ type: Boolean, required: false, default: false })
  isActive?: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  isVerified?: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  isWhitelist?: boolean;

  @Prop({ type: String, required: false, default: "" })
  ip?: string;

  @Prop({ type: String, required: false, default: "" })
  timezone?: string;

  @Prop({ type: Date, required: false })
  verificationTimestamp?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
