import useQuiz from "@/hooks/quizHooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Home = () => {
  const navigate = useNavigate();
  const [previousQuizzes, setPreviousQuizzes] = useState<string[]>([]);
  const { getQuizzes } = useQuiz();

  // Get today's date in YYYY-MM-DD format
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
    <div className="flex flex-col items-center my-10">
      <div className="p-4 w-[80%]">
        <h1 className="text-2xl font-bold mb-4">
          Vastaa kymmeneen päivittäin vaihtuvaan kutkuttavaan kysymykseen!
        </h1>
        <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
        <button
          className="block w-full p-2 mt-2 bg-blue-500 text-white rounded font-bold"
          onClick={() => handleQuizSelection(getTodayDate())}
        >
          Aloita vastaaminen!
        </button>
      </div>
      <div className="p-4 w-[80%] mt-10">
        <h2 className="text-xl font-bold mb-4">Aiempien päivien kysymyssarjat</h2>
        <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
        {previousQuizzes.map((date) => (
          <button
            key={date}
            className="block w-full p-2 mt-2 bg-blue-500 text-white rounded font-bold text-center"
            onClick={() => handleQuizSelection(date)}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
