import mongoose from "mongoose";

export interface Result {
  userId: mongoose.Schema.Types.ObjectId;
  quizId: mongoose.Schema.Types.ObjectId;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
}

export interface QuizResultResponse {
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
}


export interface AllResultsResponse {
  results: {
    quizId: mongoose.Schema.Types.ObjectId;
    quizTitle: string;
    correctAnswers: number;
    totalQuestions: number;
    completedAt: Date;
  }[];
}
