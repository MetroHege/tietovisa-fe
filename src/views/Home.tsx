import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [previousQuizzes, setPreviousQuizzes] = useState<string[]>([]);

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
    <div className="flex">
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">
          Vastaa kymmeneen päivittäin vaihtuvaan kutkuttavaan kysymykseen!
        </h1>
        <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
        <button
          className="block w-full p-2 mt-2 bg-blue-500 text-white rounded font-bold"
          onClick={() =>
            navigate("/quiz", { state: { startImmediately: true } })
          }
        >
          Aloita vastaaminen!
        </button>
      </div>
      <div className="w-1/2 p-4">
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
