import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Domain extends Document {
  @Prop({ name: "domain_name", required: true, unique: true })
  domainName: string;

  @Prop({ name: "is_whitelist", required: false, default: false })
  isWhitelist: boolean;

  @Prop({ name: "is_active", required: false, default: false })
  isActive: boolean;
}

export const domainSchema = SchemaFactory.createForClass(Domain);
