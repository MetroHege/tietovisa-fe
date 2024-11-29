import useQuiz from "@/hooks/quizHooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const formatDateToDDMMYYYY = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}.${month}.${year}`;
};

const formatMonthYear = (date: Date) => {
  const year = date.getFullYear();
  const monthNames = [
    "Tammikuu",
    "Helmikuu",
    "Maaliskuu",
    "Huhtikuu",
    "Toukokuu",
    "Kesäkuu",
    "Heinäkuu",
    "Elokuu",
    "Syyskuu",
    "Lokakuu",
    "Marraskuu",
    "Joulukuu",
  ];
  const month = monthNames[date.getMonth()];
  return `${month} ${year}`;
};

const AllQuizzes = () => {
  const navigate = useNavigate();
  const [previousQuizzes, setPreviousQuizzes] = useState<{
    [key: string]: string[];
  }>({});
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const { getQuizzes } = useQuiz();

  const getTodayDate = () => {
    const today = new Date();
    return today;
  };

  const fetchQuizzes = async () => {
    const quizzes = await getQuizzes();
    const publishedDates = quizzes.map((quiz) => new Date(quiz.publishedAt));

    const today = getTodayDate();

    // Filter out future quizzes
    const filteredDates = publishedDates.filter((date) => date < today);

    filteredDates.sort((a, b) => b.getTime() - a.getTime());

    const groupedByMonth: { [key: string]: string[] } = {};

    filteredDates.forEach((date) => {
      const monthYear = formatMonthYear(date);
      if (!groupedByMonth[monthYear]) {
        groupedByMonth[monthYear] = [];
      }
      groupedByMonth[monthYear].push(date.toISOString());
    });

    setPreviousQuizzes(groupedByMonth);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleQuizSelection = (date: string) => {
    navigate(`/quiz/date/${date}`);
  };

  const toggleMonth = (month: string) => {
    setExpandedMonth((prev) => (prev === month ? null : month));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Aiempien kuukausien kysymyssarjat
      </h1>
      <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4" />
      {Object.keys(previousQuizzes).map((month) => (
        <div key={month} className="mb-4">
          <button
            className="flex justify-between items-center w-full p-3 bg-blue-500 text-white rounded font-bold text-lg hover:bg-blue-600 transition-all"
            onClick={() => toggleMonth(month)}
          >
            {month}
            <span>
              {expandedMonth === month ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {expandedMonth === month && (
            <div className="mt-2">
              {previousQuizzes[month].map((date) => (
                <button
                  key={date}
                  className="block w-full p-3 mt-2 bg-blue-300 text-white rounded font-bold text-center text-lg hover:bg-blue-400 transition duration-300"
                  onClick={() => handleQuizSelection(date)}
                >
                  {formatDateToDDMMYYYY(new Date(date))}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllQuizzes;
