export interface Question {
  questionText: string;
  answers: { text: string; isCorrect: boolean }[];
  difficulty?: number;
  date: Date;
}
