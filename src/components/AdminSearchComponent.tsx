import React, { useState, useEffect } from "react";

import { Question } from "@/types/questionTypes";
import { Link } from "react-router-dom";
import { useQuestion } from "@/hooks/questionHooks";

const AdminSearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { searchQuestions, searchLoading, searchError, searchData } = useQuestion();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      searchQuestions(searchTerm, page);
    }
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-4 dark:bg-gray-900 my-10">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Search Questions</h2>
      <input
        type="text"
        placeholder="Search for questions or answers..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-blue-500 rounded mb-4 dark:bg-gray-700 text-dark dark:text-white font-medium"
      />

      {searchLoading && <p className="text-black dark:text-white">Loading...</p>}

      {searchError && <p className="text-red-500">{searchError}</p>}

      {searchData && searchData.questions.length > 0 && (
        <>
          <table className="min-w-full bg-white dark:bg-gray-600 text-black dark:text-white font-medium">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Question Text</th>
                <th className="py-2 px-4 border-b">Date Added</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchData.questions.map((question: Question) => (
                <tr key={question._id}>
                  <td className="py-2 px-4 border-b">{question.questionText}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(question.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/dashboard/edit-question/${question._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1 || searchLoading}
              className="px-3 py-1 bg-gray-600 text-white rounded"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-black dark:text-white">
              Page {page} of {searchData.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= searchData.totalPages || searchLoading}
              className="px-3 py-1 bg-gray-600 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!searchLoading && searchData && searchData.questions.length === 0 && searchTerm && (
        <p className="text-black dark:text-gray-300">No questions found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default AdminSearchComponent;
