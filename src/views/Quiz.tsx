import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useQuiz from "@/hooks/quizHooks";
import { Question } from "@/types/questionTypes";
import { PopulatedQuiz } from "@/types/quizTypes";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    console.log(date)
    setLoading(true);
    // const today = "2024-09-02"; // Hardcoded date for testing
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

  const handleAnswer = (selectedAnswer: {
    text: string;
    isCorrect: boolean;
  }) => {
    setUserAnswers([...userAnswers, selectedAnswer]);

    if (selectedAnswer.isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizState("completed");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
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
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap justify-center space-x-2">
              {questions.map((_, index) => {
                const isAnswered = index < currentQuestionIndex;
                const status = userAnswers[index]?.isCorrect;
                const bgColor =
                  status === true
                    ? "bg-green-500"
                    : status === false
                    ? "bg-red-500"
                    : "bg-gray-300";
                    
                const icon =
                  status === true ? "✓" : status === false ? "X" : "";

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mx-1 text-black rounded-full ${bgColor}`}
                  >
                    {isAnswered && (
                      <span
                        className={`text-xl font-bold ${
                          status === true ? "text-black" : status === false ? "text-black" : "text-black"
                        }`}
                      >
                        {icon}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-6" />
          <div className="mb-6">
            <p className="text-lg sm:text-xl dark:text-white text-center">
              {questions[currentQuestionIndex].questionText}
            </p>
            <div className="mt-2">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <button
                  key={index}
                  className="block w-full p-3 mt-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  onClick={() => handleAnswer(answer)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
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
            {showAnswers ? "Hide Correct Answers" : "Show Correct Answers"}{" "}
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
                      userAnswer?.isCorrect ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    <p className="text- sm:text-lg lg:text-xl font-bold">{question.questionText}</p>
                    <div className="mt-2 space-y-2">
                      {question.answers.map((option, optionIndex) => {
                        const isCorrect = option.isCorrect;
                        const isSelected = option.text === userAnswer?.text;
                        const bgColor = isCorrect
                          ? "bg-green-700"
                          : isSelected
                          ? "bg-red-900"
                          : "bg-gray-600"; // muuta
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
                        Correct Answer: {correctAnswer.text}
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
