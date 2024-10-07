import { Question } from './questionTypes';

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
  quizId: string;
  userId: string;
  completedAt: string;
}

export interface CompareQuizResponse {
  correctAnswers: number;
  totalQuestions: number;
  betterThanCount: number;
  totalUsers: number;
  percentage: number;
}
