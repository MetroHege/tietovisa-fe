import { Question, QuestionResponse } from "@/types/questionTypes";
import { useState } from "react";

interface QuestionFormProps {
  initialData?: QuestionResponse;
  onSubmit: (data: Partial<Question>) => void;
  loading?: boolean;
  error?: string | null;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  error = "",
}) => {
  const [questionText, setQuestionText] = useState(
    initialData?.questionText || ""
  );
  const [answers, setAnswers] = useState<
    { text: string; isCorrect: boolean; _id?: string }[]
  >(
    initialData?.answers || [
      { text: "", isCorrect: true },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]
  );
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().substr(0, 10)
      : ""
  );
  const [difficulty, setDifficulty] = useState(
    initialData?.difficulty || 0
  );

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      alert("Question text is required.");
      return;
    }

    if (answers.some((answer) => !answer.text.trim())) {
      alert("All answer options must be filled out.");
      return;
    }

    if (!answers.some((answer) => answer.isCorrect)) {
      alert("Please select the correct answer.");
      return;
    }

    const updatedQuestion: Partial<Question> = {
      questionText,
      answers,
      date: date ? new Date(date) : undefined,
      difficulty,
    };

    onSubmit(updatedQuestion);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Question Text
        </label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          rows={3}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {questionText.length} characters
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Difficulty
        </label>
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          min={0}
          max={10}
          className="mt-1 block w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Difficulty level from 0 (easiest) to 10 (hardest)
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Answers
        </label>
        {answers.map((answer, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="radio"
              name="correctAnswer"
              checked={answer.isCorrect}
              onChange={() => handleCorrectAnswerChange(index)}
              className="mr-2"
            />
            <input
              type="text"
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
            />
            <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {answer.text.length} characters
            </p>
          </div>
        ))}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Select the correct answer by clicking the radio button.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Question"}
      </button>
    </form>
  );
};

export default QuestionForm;
