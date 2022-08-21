import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = UserModel & Document;

@Schema({ collection: "users" })
export class UserModel {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 6 })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
