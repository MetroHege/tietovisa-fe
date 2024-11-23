import React, { useState, useEffect } from "react";
import { Question } from "@/types/questionTypes";
import { useQuestion } from "@/hooks/questionHooks";

interface AdminSearchComponentProps {
  onAction: (questionId: string) => void; // Action callback
  actionLabel?: string; // Label for the action button
}

const AdminSearchComponent: React.FC<AdminSearchComponentProps> = ({
  onAction,
  actionLabel = "Edit", // Default to "Edit"
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { searchQuestions, searchLoading, searchData } = useQuestion();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    searchQuestions(searchTerm, page);
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="relative max-w-full md:max-w-screen-md mx-auto p-4 md:p-6 dark:bg-gray-900 my-10">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Hae kysymyksiä
      </h2>
      <input
        type="text"
        placeholder="Hae kysymyksiä tai vastauksia..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-blue-500 rounded mb-4 dark:bg-gray-700 text-black dark:text-white font-medium"
      />

      <div className="overflow-x-auto relative">
        {searchLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 z-10">
            <p className="text-black dark:text-white">Ladataan...</p>
          </div>
        )}

        {searchData && searchData.questions.length > 0 && (
          <table className="min-w-full bg-white dark:bg-gray-600 text-black dark:text-white font-medium">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Kysymysteksti</th>
                <th className="py-2 px-4 border-b">Lisäyspäivämäärä</th>
                <th className="py-2 px-4 border-b">Toiminnot</th>
              </tr>
            </thead>
            <tbody>
              {searchData.questions.map((question: Question) => (
                <tr key={question._id}>
                  <td className="py-2 px-4 border-b">
                    {question.questionText}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(question.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => onAction(question._id)}
                      className="text-blue-500 hover:underline"
                    >
                      {actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!searchLoading && searchData && searchData.questions.length === 0 && (
          <p className="text-black dark:text-gray-300">
            Ei kysymyksiä löytynyt{searchTerm && ` haulla "${searchTerm}"`}.
          </p>
        )}
      </div>

      {searchData && searchData.totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || searchLoading}
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Edellinen
          </button>
          <span className="text-black dark:text-white">
            Sivu {page} / {searchData.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= searchData.totalPages || searchLoading}
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Seuraava
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSearchComponent;
