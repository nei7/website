import { Schema, model, type Document } from "mongoose";

export interface User {
  email: string;
  name: string;
  password: string;
  avatarUrl: string;
}

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: String
});

export const User = model<User & Document>("User", UserSchema);
