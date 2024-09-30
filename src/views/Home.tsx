import useQuiz from "@/hooks/quizHooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateToDDMMYYYY = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}.${month}.${year}`;
};

const Home = () => {
  const navigate = useNavigate();
  const [previousQuizzes, setPreviousQuizzes] = useState<string[]>([]);
  const { getQuizzes } = useQuiz();

  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  const fetchQuizzes = async () => {
    const quizzes = await getQuizzes();
    const publishedDates = quizzes.map((quiz) => new Date(quiz.publishedAt));
    const formattedDates = publishedDates.map(formatDate);
    console.log(formattedDates);
    setPreviousQuizzes(formattedDates);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleQuizSelection = (date: string) => {
    navigate(`/quiz/${date}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
          Vastaa kymmeneen päivittäin vaihtuvaan kutkuttavaan kysymykseen!
        </h1>
        <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
        <button
          className="block w-full p-3 mt-4 bg-blue-500 text-white rounded font-bold text-lg hover:bg-blue-600 transition-all"
          onClick={() => handleQuizSelection(getTodayDate())}
        >
          Aloita vastaaminen!
        </button>
      </div>
      <div className="relative z-10 w-full md:w-1/2 p-4">
        <h2 className="text-lg md:text-xl font-bold mb-4 dark:text-white">
          Aiempien päivien kysymyssarjat
        </h2>
        <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
        {previousQuizzes.map((date) => (
          <button
            key={date}
            className="block w-full p-3 mt-4 bg-blue-500 text-white rounded font-bold text-center text-lg hover:bg-blue-600 hover:shadow-xl transition duration-300"
            onClick={() => handleQuizSelection(date)}
          >
            {formatDateToDDMMYYYY(new Date(date))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
