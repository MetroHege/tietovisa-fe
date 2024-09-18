import mongoose, { Document } from "mongoose";

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  role: string;
  email: string;
  password: string;
  scores: {
    quizId: mongoose.Schema.Types.ObjectId;
    score: number;
    completedAt: Date;
  }[],
  matchPassword(enteredPassword: string): Promise<boolean>
}
