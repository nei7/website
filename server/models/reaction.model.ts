import { Schema, model, type Document } from "mongoose";

export interface IReaction {
  thumbup_count: number;
  skull_count: number;
  heart_count: number;
  post_id: string;
}

const ReactionSchema = new Schema({
  skull_count: {
    type: Number,
    default: 0
  },
  heart_count: {
    type: Number,
    default: 0
  },
  thumbup_count: {
    type: Number,
    default: 0
  },
  post_id: {
    type: String,
    unique: true,
    required: true
  }
});

export const Reaction = model<IReaction & Document>("Reaction", ReactionSchema);
