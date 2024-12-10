import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useQuiz from "@/hooks/quizHooks";
import { Question } from "@/types/questionTypes";
import {
  CompareQuizResponse,
  PopulatedQuiz,
  SubmitQuizResponse,
} from "@/types/quizTypes";
import { useParams } from "react-router-dom";

const formatDateToDDMMYYYY = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const getNextDate = (date: string) => {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const getPreviousDate = (date: string) => {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

const MIN_USER_THRESHOLD = 2;

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
  const [nextQuizError, setNextQuizError] = useState<string | null>(null); // State for next quiz error
  const [previousQuizError, setPreviousQuizError] = useState<string | null>(
    null
  ); // State for previous quiz error
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
  const navigate = useNavigate();

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

  const checkNextQuizExists = async (nextDate: string) => {
    try {
      const nextQuiz: PopulatedQuiz = await getQuizzesByDate(nextDate);
      return !!nextQuiz;
    } catch (error) {
      return false;
    }
  };

  const checkPreviousQuizExists = async (previousDate: string) => {
    try {
      const previousQuiz: PopulatedQuiz = await getQuizzesByDate(previousDate);
      return !!previousQuiz;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [date]);

  const handleAnswer = (
    questionIndex: number,
    selectedAnswer: { _id?: string; text: string; isCorrect: boolean }
  ) => {
    if (selectedAnswer._id === undefined) return;
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
      setErrorMessage("Vastaatathan kaikkiin kysymyksiin!"); // "Please answer all the questions!"
      return;
    }

    let correctCount = 0;

    // Calculate correct answers (no changes to this logic)
    userAnswers.forEach((userAnswer, index) => {
      const question = questions[index];
      const correctAnswer = question.answers.find((a) => a.isCorrect);

      // Ensure no error occurs if userAnswer is undefined or missing properties
      if (userAnswer && userAnswer.answerId && correctAnswer) {
        if (correctAnswer._id === userAnswer.answerId) {
          correctCount++;
        }
      }
    });

    setCorrectAnswers(correctCount);
    setQuizState("completed");

    const token = localStorage.getItem("token");

    if (!token) {
      // Logic for guests (users without tokens)
      setErrorMessage("Olet kirjautumaton. Tuloksiasi ei tallenneta."); // "You are not logged in. Your results won't be saved."

      // Show results locally without backend calls
      setComparisonStats({
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        betterThanCount: null,
        totalUsers: null,
        percentage: null,
        questionStats: questions.map((question) => ({
          questionId: question._id,
          questionText: question.questionText,
          correctPercentage: null,
        })),
      });
      return; // Skip backend submission for guests
    }

    // Original logic for logged-in users (unchanged)
    try {
      const result: SubmitQuizResponse = await submitQuizResult(
        quizId,
        userAnswers
      );
      setCorrectAnswers(result.correctAnswers);

      const comparison = await compareQuizResult(quizId);

      // Combine comparison data and questionStats
      setComparisonStats({
        ...comparison,
        questionStats: result.questionStats,
      });
    } catch (error) {
      setErrorMessage("Virhe vastausten lähettämisessä."); // "Error submitting quiz results."
      console.error("Error submitting quiz results:", error);
    }
  };
  const handleNextQuiz = async () => {
    const nextDate = getNextDate(date!);
    const today = new Date().toISOString().split("T")[0];
    if (nextDate > today) {
      setNextQuizError("Et voi siirtyä tulevaan visaan.");
      return;
    }
    const exists = await checkNextQuizExists(nextDate);
    if (exists) {
      navigate(`/quiz/date/${nextDate}`);
    } else {
      setNextQuizError("Seuraavaa visaa ei ole saatavilla.");
    }
  };

  const handlePreviousQuiz = async () => {
    const previousDate = getPreviousDate(date!);
    const exists = await checkPreviousQuizExists(previousDate);
    if (exists) {
      navigate(`/quiz/date/${previousDate}`);
    } else {
      setPreviousQuizError("Edellistä visaa ei ole saatavilla.");
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
                              ? "bg-blue-800 dark:bg-blue-900 text-white border-2 border-blue-900 dark:border-blue-700"
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
                  <div className="my-6 flex justify-center"></div>
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
              {comparisonStats.totalUsers === null ? (
                <p></p> // "Log in to see how you compare to others!"
              ) : comparisonStats.totalUsers === 1 ? (
                <p>Olet ensimmäinen osallistuja tässä visassa!</p> // "You are the first participant in this quiz!"
              ) : comparisonStats.totalUsers < MIN_USER_THRESHOLD ? (
                <p>
                  Vähintään {MIN_USER_THRESHOLD} osallistujaa tarvitaan
                  tilastojen näyttämiseen.
                </p> // "At least MIN_USER_THRESHOLD participants are needed to display stats."
              ) : (
                <>
                  <p>{`Olet parempi kuin ${
                    comparisonStats.percentage !== null
                      ? Math.round(comparisonStats.percentage)
                      : "N/A"
                  }% muista osallistujista`}</p>
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

                // Get questionStat from comparisonStats
                const questionStat = comparisonStats?.questionStats?.find(
                  (stat) => stat.questionId === question._id
                );

                const userGotCorrect =
                  correctAnswer && correctAnswer._id === userAnswer?.answerId;

                return (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded-lg ${
                      userGotCorrect
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

                    {questionStat &&
                      questionStat.correctPercentage === null && <></>}

                    {questionStat &&
                      questionStat.correctPercentage === 0 &&
                      (userGotCorrect ? (
                        <p className="mt-1 text-sm text-green-600 dark:text-green-400 font-bold">
                          Olet ensimmäinen joka sai kysymyksen oikein!
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-bold">
                          Kukaan ei ole vielä saanut tätä kysymystä oikein.
                        </p>
                      ))}

                    {questionStat &&
                      questionStat.correctPercentage === 100 &&
                      comparisonStats != null &&
                      comparisonStats.totalUsers != null &&
                      comparisonStats.totalUsers >= MIN_USER_THRESHOLD &&
                      !userGotCorrect && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-bold">
                          Kaikki muut osallistujat saivat tämän kysymyksen
                          oikein.
                        </p>
                      )}

                    {questionStat &&
                      questionStat.correctPercentage === 100 &&
                      comparisonStats != null &&
                      comparisonStats.totalUsers != null &&
                      comparisonStats.totalUsers >= MIN_USER_THRESHOLD &&
                      userGotCorrect && (
                        <p className="mt-1 text-sm text-green-600 dark:text-green-400 font-bold">
                          Kaikki ovat saaneet tämän kysymyksen oikein.
                        </p>
                      )}

                    {questionStat &&
                      questionStat.correctPercentage != null &&
                      questionStat.correctPercentage > 0 &&
                      questionStat.correctPercentage < 100 && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {questionStat.correctPercentage}% osallistujista
                          vastasi tähän kysymykseen oikein.
                        </p>
                      )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              className="w-1/3 p-3 mt-6 bg-blue-500 text-white rounded-lg font-bold flex justify-center items-center hover:bg-blue-600 transition-all"
              onClick={handlePreviousQuiz}
            >
              <FaArrowLeft className="mr-2" /> Aiempi päivä
            </button>
            <button
              className="w-1/3 p-3 mt-6 bg-blue-500 text-white rounded-lg font-bold flex justify-center items-center hover:bg-blue-600 transition-all"
              onClick={() => navigate("/")}
            >
              Etusivulle
            </button>
            <button
              className="w-1/3 p-3 mt-6 bg-blue-500 text-white rounded-lg font-bold flex justify-center items-center hover:bg-blue-600 transition-all"
              onClick={handleNextQuiz}
            >
              Seuraava päivä <FaArrowRight className="ml-2" />
            </button>
          </div>
          {nextQuizError && (
            <p className="text-red-500 text-center mt-4">{nextQuizError}</p>
          )}
          {previousQuizError && (
            <p className="text-red-500 text-center mt-4">{previousQuizError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
