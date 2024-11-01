export interface Question {
  _id: string;
  questionText: string;
  answers: Answer[];
  date: Date;
  difficulty: number;
}

export interface Answer {
  _id?: string;
  text: string;
  isCorrect: boolean;
}

export interface NewQuestionData {
  questionText: string;
  date: string;
  answers: Answer[];
}

export interface SearchResponse {
  totalQuestions: number;
  totalPages: number;
  currentPage: number;
  questions: Question[];
}

export interface QuestionResponse {
  _id: string;
  questionText: string;
  answers: Answer[];
  difficulty: number;
  date: string;
}

export interface CountResponse {
  count: number;
}
