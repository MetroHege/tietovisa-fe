import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockQuestions, Question } from "./mockQuestions";
import { FaArrowLeft, FaArrowUp, FaArrowDown } from "react-icons/fa";
import ProgressBar from "../components/ProgressBar"; // Import the ProgressBar component

const mockAnalytics = [
  75, // 75% of users answered the first question correctly
  60, // 60% of users answered the second question correctly
  85, // 85% of users answered the third question correctly
  45, // 45% of users answered the fourth question correctly
  70, // 70% of users answered the fifth question correctly
  34, // 34% of users answered the sixth question correctly
  12, // 12% of users answered the seventh question correctly
  92, // 92% of users answered the eighth question correctly
  87,
  98,
  // Add more percentages for each question
];

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [questionStatus, setQuestionStatus] = useState<
    ("correct" | "incorrect" | "unanswered")[]
  >([]);
  const [quizState, setQuizState] = useState<
    "notStarted" | "inProgress" | "completed"
  >("notStarted");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch questions
    const fetchQuestions = async () => {
      setLoading(true);
      setQuestions(mockQuestions);
      setQuestionStatus(new Array(mockQuestions.length).fill("unanswered"));
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Check if the quiz should start immediately
    if (location.state?.startImmediately) {
      setQuizState("inProgress");
    }
  }, [location.state]);

  useEffect(() => {
    // Show scroll to top button when scrolled down
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAnswer = (selectedOption: string) => {
    setUserAnswers((prev) => [...prev, selectedOption]);
    const newStatus = [...questionStatus];
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setCorrectAnswers((prev) => prev + 1);
      newStatus[currentQuestionIndex] = "correct";
    } else {
      newStatus[currentQuestionIndex] = "incorrect";
    }
    setQuestionStatus(newStatus);
    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizState("completed");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const startQuiz = () => {
    setQuizState("inProgress");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div>Ladataan...</div>;
  }

  return (
    <div className="relative p-4">
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center p-2 bg-red-500 text-white rounded font-bold"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="mr-2" />
          Takaisin
        </button>
      </div>

      {showScrollToTop && (
        <button
          className="fixed bottom-4 right-4 flex items-center p-2 bg-blue-500 text-white rounded-full z-50"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}

      {quizState === "notStarted" && (
        <div className="flex justify-center items-center min-h-screen">
          <button
            className="block w-full p-2 mt-2 bg-blue-500 text-white rounded font-bold"
            onClick={startQuiz}
          >
            Aloita vastaaminen!
          </button>
        </div>
      )}

      {quizState === "completed" && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            {correctAnswers <= 3 &&
              "Parempaa onnea ensi kerralla, yritä uudestaan!"}
            {correctAnswers > 3 &&
              correctAnswers <= 6 &&
              "Hyvä yritys, jatka samaan malliin!"}
            {correctAnswers > 6 &&
              correctAnswers <= 9 &&
              "Hienoa työtä, olet melkein mestari!"}
            {correctAnswers === 10 && "Täydellinen tulos! Erinomaista työtä!"}
          </h1>
          <p className="text-4xl font-bold text-center mb-4">
            {correctAnswers}/{questions.length}
          </p>
          <button
            className="block w-full p-2 mt-2 bg-blue-500 text-black rounded font-bold flex justify-center items-center"
            onClick={() => setShowAnswers(!showAnswers)} // Toggle the showAnswers state
          >
            {showAnswers
              ? "Piilota oikeat vastaukset"
              : "Näytä oikeat vastaukset"}{" "}
            <span className="ml-2">
              {showAnswers ? <FaArrowUp /> : <FaArrowDown />}
            </span>
          </button>
          {showAnswers && (
            <div className="mt-4">
              {questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg">{question.question}</p>
                  <div className="mt-2">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = option === question.answer;
                      const isSelected = option === userAnswers[index];
                      const bgColor = isCorrect
                        ? "bg-green-500"
                        : isSelected
                        ? "bg-red-500"
                        : "bg-gray-200";
                      return (
                        <div
                          key={optionIndex}
                          className={`block w-full p-2 mt-2 text-white rounded ${bgColor} transition-opacity duration-500 ease-in-out ${
                            showAnswers ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                  {showAnswers && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-bold">
                        Näin moni tiesi oikean vastauksen:
                      </p>
                      <ProgressBar percentage={mockAnalytics[index]} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {quizState === "inProgress" && (
        <div>
          <div className="flex justify-center mb-4">
            <div className="flex flex-wrap justify-center space-x-2">
              {questions.map((_, index) => {
                const status = questionStatus[index];
                const bgColor =
                  status === "correct"
                    ? "bg-green-500"
                    : status === "incorrect"
                    ? "bg-red-500"
                    : "bg-gray-300";
                const icon =
                  status === "correct"
                    ? "✓"
                    : status === "incorrect"
                    ? "X"
                    : "";
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mx-1 text-white rounded-full ${bgColor}`}
                  >
                    {icon}
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
          <div className="mb-4">
            <p className="text-lg">
              {questions[currentQuestionIndex].question}
            </p>
            <div className="mt-2">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="block w-full p-2 mt-2 bg-blue-500 text-white rounded"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
