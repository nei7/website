import { Schema, model, type Document } from "mongoose";
import { hash } from "argon2";

export interface IUser {
  email: string;
  username: string;
  password?: string;
  avatarUrl: string;
  github: any;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    password: { type: String, required: false, default: null },
    avatarUrl: String,
    github: { type: Object, required: false, default: null },
    discord: { type: Object, required: false, default: null }
  },
  { versionKey: false }
);

UserSchema.pre("save", async function () {
  if (this.password) {
    this.password = await hash(this.password);
  }
});

export const User = model<IUser & Document>("User", UserSchema);
