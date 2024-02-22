import { Schema, model, type Document } from "mongoose";

export interface IComment {
  username: string;
  avatar_url?: string;
  data: string;
  reply_of?: string;
  user_id: string;
  profile_url?: string;
  post_id: string;
}

const CommentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  avatar_url: String,
  post_id: {
    type: String,
    required: true
  },
  profile_url: String,
  reply_of: {
    type: String,
    default: null
  },
  user_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Number,
    default: Date.now()
  },
  loved: {
    type: Number,
    default: 0
  }
});

export const Comment = model<IComment & Document>("Comment", CommentSchema);
