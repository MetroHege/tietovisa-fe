import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useQuiz from "@/hooks/quizHooks";
import { Question } from "@/types/questionTypes";
import { CompareQuizResponse, PopulatedQuiz } from "@/types/quizTypes";
import { useParams } from "react-router-dom";
import { MediumRectangleAd, MobileLeaderboardAd } from "@/components/Ads"; // Import ad components

const formatDateToDDMMYYYY = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizId, setQuizId] = useState<string>("");
  const [quizState, setQuizState] = useState<"inProgress" | "completed">(
    "inProgress"
  );
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; answerId: string }[]
  >([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    getQuizzesByDate,
    submitQuizResult,
    quizzesLoading,
    quizzesError,
    compareQuizResult,
  } = useQuiz();
  const [showAnswers, setShowAnswers] = useState(false);
  const { date } = useParams<{ date: string }>();
  const [comparisonStats, setComparisonStats] =
    useState<CompareQuizResponse | null>(null);

  const fetchQuiz = async () => {
    if (!date) return;
    setLoading(true);
    try {
      const quizData: PopulatedQuiz = await getQuizzesByDate(date);
      setQuizId(quizData._id);
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
  }, [date]);

  const handleAnswer = (
    questionIndex: number,
    selectedAnswer: { _id: string; text: string; isCorrect: boolean }
  ) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = {
      questionId: questions[questionIndex]._id,
      answerId: selectedAnswer._id,
    };
    setUserAnswers(newUserAnswers);
    setErrorMessage(null);
  };

  const handleSubmit = async () => {
    if (userAnswers.length !== questions.length) {
      setErrorMessage("Vastaatathan kaikkiin kysymyksiin!");
      return;
    }

    let correctCount = 0;

    userAnswers.forEach((userAnswer, index) => {
      const question = questions[index];
      const correctAnswer = question.answers.find((a) => a.isCorrect);
      if (correctAnswer && correctAnswer._id === userAnswer.answerId) {
        correctCount++;
      }
    });

    setCorrectAnswers(correctCount);
    setQuizState("completed");

    try {
      const result = await submitQuizResult(quizId, userAnswers);
      setCorrectAnswers(result.correctAnswers);

      const comparison = await compareQuizResult(quizId);
      setComparisonStats(comparison);
    } catch (error) {
      setErrorMessage("Virhe vastausten lähettämisessä.");
      console.error("Error submitting quiz results:", error);
    }
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
            <div key={questionIndex}>
              <div className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
                <p className="text-lg sm:text-xl dark:text-white text-center font-bold">
                  {questionIndex + 1}. {question.questionText}
                </p>
                <div className="mt-2">
                  {question.answers.map((answer, answerIndex) => {
                    const isSelected =
                      userAnswers[questionIndex]?.answerId === answer._id;
                    return (
                      <div key={answerIndex}>
                        <button
                          className={`block w-full p-3 mt-3 rounded-lg transition-all ${
                            isSelected
                              ? "bg-blue-700 text-white"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                          onClick={() => handleAnswer(questionIndex, answer)}
                        >
                          {answer.text}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Insert ad after every 3 questions */}
              {(questionIndex + 1) % 3 === 0 &&
                questionIndex !== questions.length - 1 && (
                  <div className="my-6 flex justify-center">
                    <MediumRectangleAd />
                  </div>
                )}
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

          {comparisonStats && (
            <div className="mb-6 text-center dark:text-white">
              {comparisonStats.totalUsers === 1 ? (
                <p>Olet ensimmäinen osallistuja tässä visassa!</p>
              ) : (
                <>
                  <p>{`Olet parempi kuin ${comparisonStats.percentage}% muista osallistujista`}</p>
                  <p>{`Osallistujia yhteensä: ${comparisonStats.totalUsers}`}</p>
                </>
              )}
            </div>
          )}
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
                      correctAnswer && correctAnswer._id === userAnswer.answerId
                        ? "bg-green-100 dark:bg-green-900 border border-green-500"
                        : "bg-red-100 dark:bg-red-900 border border-red-500"
                    }`}
                  >
                    <p className="sm:text-lg lg:text-xl font-bold dark:text-white">
                      {index + 1}. {question.questionText}
                    </p>
                    <div className="mt-2 space-y-2">
                      {question.answers.map((option, optionIndex) => {
                        const isCorrect = option.isCorrect;
                        const isSelected = option._id === userAnswer?.answerId;
                        const bgColor = isCorrect
                          ? "bg-green-500 text-white dark:bg-green-700"
                          : isSelected
                          ? "bg-red-500 text-white dark:bg-red-700"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
                        return (
                          <div
                            key={optionIndex}
                            className={`block w-full p-2 mt-2 rounded ${bgColor}`}
                          >
                            {option.text}
                          </div>
                        );
                      })}
                    </div>
                    {userAnswer &&
                      correctAnswer &&
                      correctAnswer._id !== userAnswer.answerId && (
                        <p className="mt-2 text-base text-gray-800 dark:text-gray-200 font-bold">
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
