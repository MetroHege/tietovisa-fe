import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useQuiz from "@/hooks/quizHooks";
import { Question } from "@/types/questionTypes";
import { PopulatedQuiz } from "@/types/quizTypes";
import { useParams } from "react-router-dom";

const formatDateToDDMMYYYY = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null); // Clear error message on answer selection
  };

  const handleSubmit = () => {
    if (userAnswers.length !== questions.length) {
      setErrorMessage("Vastaatathan kaikkiin kysymyksiin!");
      return;
    }

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
    return <div>Virhe kysymysten lataamisessa: {quizzesError}</div>;
  }

  return (
    <div className="relative p-4 max-w-3xl mx-auto">
      {quizState === "inProgress" && (
        <div className="question-section">
          <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
            Päivän {formatDateToDDMMYYYY(date!)} kysymyssarja
          </h2>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <p className="text-lg sm:text-xl dark:text-white text-center font-bold">
                {questionIndex + 1}. {question.questionText}
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
          {errorMessage && (
            <p className="text-red-500 text-center mb-2">{errorMessage}</p>
          )}
          <button
            className="block w-full p-3 mt-6 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all"
            onClick={handleSubmit}
          >
            Jätä vastaukset
          </button>
        </div>
      )}

      {quizState === "completed" && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
            {correctAnswers === 0 &&
              "Ou nou, nyt taisi olla mukana myös huonoa säkää! Ehkä ei kannata lotota tänään..."}
            {correctAnswers === 1 && "Ai ai, eikun au au, nyt sattuu!"}
            {correctAnswers === 2 && "Ai ai ai, aina ei mene hyvin!"}
            {correctAnswers === 3 &&
              "Seuraavassa visassa mietitään ehkä hieman kauemmin!"}
            {correctAnswers === 4 &&
              "Ehkä luetaan uutisia hieman enemmän ja tarkemmin jatkossa!"}
            {correctAnswers === 5 &&
              "Ei huono tulos, kysymykset eivät ole helppoja!"}
            {correctAnswers === 6 &&
              "Ei huono tulos, kysymykset eivät ole helppoja!"}
            {correctAnswers === 7 &&
              "Ihan ok tulos, kysymykset eivät ole helppoja!"}
            {correctAnswers === 8 && "Hyvä tulos, olet hyvin perillä asioista!"}
            {correctAnswers === 9 &&
              "Hieno saavutus, olet hyvin perillä asioista!"}
            {correctAnswers === 10 &&
              "Todella upeaa, olet erittäin hyvin perillä asioista!"}
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
                      {index + 1}. {question.questionText}
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
