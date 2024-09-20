export interface Question {
  _id: string;
  questionText: string;
  answers: { text: string; isCorrect: boolean }[];
  date: Date;
  difficulty: number;

}
