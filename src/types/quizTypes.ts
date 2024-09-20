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
