import mongoose, { Types, Document } from 'mongoose';
import { Question } from './questionTypes';

export interface Quiz extends Document {
  _id: string;
  title: string;
  questions: Types.ObjectId[];
  publishedAt: Date;
  isPublished: boolean;
}

export interface PopulatedQuiz extends Document {
  title: string;
  questions: Question[];
  publishedAt: Date;
  isPublished: boolean;
}
