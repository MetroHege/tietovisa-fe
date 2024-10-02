import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useQuiz from "@/hooks/quizHooks";
import { Question } from "@/types/questionTypes";
import { PopulatedQuiz } from "@/types/quizTypes";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<"inProgress" | "completed">(
    "inProgress"
  );
  const [userAnswers, setUserAnswers] = useState<
    { text: string; isCorrect: boolean }[]
  >([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getQuizzesByDate, quizzesLoading, quizzesError } = useQuiz();
  const [showAnswers, setShowAnswers] = useState(false);
  const { date } = useParams<{ date: string }>();

  const fetchQuiz = async () => {
    if (!date) return;
    console.log(date);
    setLoading(true);
    try {
      const quizData: PopulatedQuiz = await getQuizzesByDate(date);
      const questionsFromQuiz = quizData.questions.map((question) => ({
        _id: question._id,
        questionText: question.questionText,
        answers: question.answers,
        difficulty: question.difficulty,
        date: question.date,
      }));

      setQuestions(questionsFromQuiz);
      setQuizState("inProgress");
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAnswer = (
    questionIndex: number,
    selectedAnswer: { text: string; isCorrect: boolean }
  ) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    userAnswers.forEach((answer) => {
      if (answer?.isCorrect) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
    setQuizState("completed");
  };

  if (loading || quizzesLoading) {
    return <div>Ladataan...</div>;
  }

  if (quizzesError) {
    return <div>Error loading quiz: {quizzesError}</div>;
  }

  return (
    <div className="relative p-4 max-w-3xl mx-auto">
      {quizState === "inProgress" && (
        <div className="question-section">
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <p className="text-lg sm:text-xl dark:text-white text-center">
                {question.questionText}
              </p>
              <div className="mt-2">
                {question.answers.map((answer, answerIndex) => (
                  <button
                    key={answerIndex}
                    className={`block w-full p-3 mt-3 rounded-lg transition-all ${
                      userAnswers[questionIndex]?.text === answer.text
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={() => handleAnswer(questionIndex, answer)}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="block w-full p-3 mt-6 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all"
            onClick={handleSubmit}
            disabled={userAnswers.length !== questions.length}
          >
            Jätä vastaukset
          </button>
        </div>
      )}

      {quizState === "completed" && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
            {correctAnswers <= 3 && "Better luck next time, try again!"}
            {correctAnswers > 3 &&
              correctAnswers <= 6 &&
              "Good effort, keep it up!"}
            {correctAnswers > 6 &&
              correctAnswers <= 9 &&
              "Great job, you're almost a master!"}
            {correctAnswers === 10 && "Perfect score! Excellent work!"}
          </h1>
          <p className="text-4xl font-bold text-center mb-6 dark:text-white">
            {correctAnswers}/{questions.length}
          </p>
          <button
            className="w-full p-3 mt-3 bg-blue-500 text-white rounded-lg font-bold flex justify-center items-center hover:bg-blue-600 transition-all"
            onClick={() => setShowAnswers(!showAnswers)}
          >
            {showAnswers
              ? "Piilota oikeat vastaukset"
              : "Näytä oikeat vastaukset"}{" "}
            <span className="ml-2">
              {showAnswers ? <FaArrowUp /> : <FaArrowDown />}
            </span>
          </button>
          {showAnswers && (
            <div className="mt-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const correctAnswer = question.answers.find(
                  (answer) => answer.isCorrect
                );

                return (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded-lg ${
                      userAnswer?.isCorrect
                        ? "bg-green-200 shadow-2xl"
                        : "bg-red-200 shadow-2xl"
                    }`}
                  >
                    <p className="sm:text-lg lg:text-xl font-bold">
                      {question.questionText}
                    </p>
                    <div className="mt-2 space-y-2">
                      {question.answers.map((option, optionIndex) => {
                        const isCorrect = option.isCorrect;
                        const isSelected = option.text === userAnswer?.text;
                        const bgColor = isCorrect
                          ? "bg-green-800 shadow-2xl font-semibold"
                          : isSelected
                          ? "bg-red-900 shadow-2xl font-semibold"
                          : "bg-gray-600";
                        return (
                          <div
                            key={optionIndex}
                            className={`block w-full p-2 mt-2 text-white rounded ${bgColor}`}
                          >
                            {option.text}
                          </div>
                        );
                      })}
                    </div>
                    {!userAnswer?.isCorrect && correctAnswer && (
                      <p className="mt-2 text-base text-gray-800 font-bold">
                        Oikea vastaus: {correctAnswer.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
