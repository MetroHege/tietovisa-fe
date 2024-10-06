import { useEffect, useState } from "react";
import useQuiz from "@/hooks/quizHooks";

const AdminQuiz = () => {
  const { getQuizzesByDateRange, quizzesData, quizzesLoading, quizzesError } = useQuiz();

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    fetchQuizzesForMonth();
  }, [selectedMonth]);

  const fetchQuizzesForMonth = () => {
    const [year, month] = selectedMonth.split("-");
    const startOfMonth = new Date(Number(year), Number(month) - 1, 1).toISOString();
    const endOfMonth = new Date(Number(year), Number(month), 0).toISOString();

    getQuizzesByDateRange(startOfMonth, endOfMonth);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchByDateRange = () => {
    if (startDate && endDate) {
      getQuizzesByDateRange(startDate, endDate);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-white text-2xl mb-6 text-left">Tietovisat</h2>

      <div className="flex flex-col justify-start w-full space-y-4">
        {/* Month Picker */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label className="text-white">Hae kuukausittain:</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 rounded bg-gray-700 text-left text-white w-full md:w-auto"
            />
          </div>
        </div>

        {/* Date Range Picker for Custom Search */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex flex-col">
              <label className="text-white">Aloituspäivä:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Lopetuspäivä:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
              />
            </div>
            <button
              onClick={handleSearchByDateRange}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 md:mt-0"
            >
              Hae
            </button>
          </div>
        </div>
      </div>

      {/* Display loading state */}
      {quizzesLoading && (
        <div className="text-white text-center mt-4">Ladataan tietovisoja...</div>
      )}

      {/* Display error state */}
      {quizzesError && (
        <div className="text-red-500 text-center mt-4">{quizzesError}</div>
      )}

      {/* Display quizzes */}
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzesData &&
          quizzesData.map((quiz) => (
            <div key={quiz._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-white text-xl mb-2 font-semibold">{quiz.title}</h3>
              <p className="text-gray-400 mb-4">Kysymykset: {quiz.questions.length}</p>
              <p className="text-gray-400">
                Julkaistu: {new Date(quiz.publishedAt).toLocaleDateString()}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => alert(`View quiz: ${quiz._id}`)}
              >
                Tarkastele
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminQuiz;
