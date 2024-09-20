import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [previousQuizzes, setPreviousQuizzes] = useState<string[]>([]);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Fetch previous quizzes data
    // For now, we'll use mock data
    const fetchPreviousQuizzes = async () => {
      const mockData = ["2023-10-01", "2023-10-02", "2023-10-03"];
      setPreviousQuizzes(mockData);
    };

    fetchPreviousQuizzes();
  }, []);

  const handleQuizSelection = (date: string) => {
    navigate(`/quiz/${date}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">
          Vastaa kymmeneen päivittäin vaihtuvaan kutkuttavaan kysymykseen!
        </h1>
        <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
        <button
          className="block w-full p-2 mt-2 bg-blue-500 text-white rounded font-bold"
          onClick={() => handleQuizSelection(getTodayDate())} // Navigate with today's date
        >
          Aloita vastaaminen!
        </button>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">
          Aiempien päivien kysymyssarjat
        </h2>
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
