import { Question } from "./questionTypes";

export interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
  publishedAt: Date;
  isPublished: boolean;
}

export interface PopulatedQuiz {
  _id: string;
  title: string;
  questions: Question[];
  publishedAt: Date;
  isPublished: boolean;
}

export interface deleteQuizResponse {
  message: string;
}

export interface CsvUploadResponse {
  message: string;
  _id: string;
  title: string;
  questions: Question[];
  publishedAt: string;
  isPublished: boolean;
  __v: number;
}

export interface SubmitQuizResponse {
  correctAnswers: number;
  totalQuestions: number;
  points: number;
  questionStats: QuestionStats[];
}

export interface QuestionStats {
  questionId: string;
  questionText: string;
  correctPercentage: number | null;
}

export interface CompareQuizResponse {
  correctAnswers: number;
  totalQuestions: number;
  betterThanCount: number | null;
  totalUsers: number | null;
  percentage: number | null;
  questionStats: QuestionStats[];
}
