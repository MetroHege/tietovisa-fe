import React, {useState, useEffect} from 'react';
import {Question} from '@/types/questionTypes';
import {Link} from 'react-router-dom';
import {useQuestion} from '@/hooks/questionHooks';

const AdminSearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const {searchQuestions, searchLoading, searchData} = useQuestion();

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
        Search Questions
      </h2>
      <input
        type="text"
        placeholder="Search for questions or answers..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-blue-500 rounded mb-4 dark:bg-gray-700 text-black dark:text-white font-medium"
      />

      {/* Overlay loading indicator */}
      <div className="overflow-x-auto relative">
        {searchLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 z-10">
            <p className="text-black dark:text-white">Loading...</p>
          </div>
        )}

        {searchData && searchData.questions.length > 0 && (
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
                  <td className="py-2 px-4 border-b">
                    {question.questionText}
                  </td>
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
        )}
      </div>

      {/* Pagination, only displayed if there are questions */}
      {searchData && searchData.questions.length > 0 && (
        <div className="flex flex-col items-center mt-4 space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || searchLoading}
            className="px-3 py-1 bg-gray-600 text-white rounded w-full md:w-auto"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-black dark:text-white">
            Page {page} of {searchData.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= searchData.totalPages || searchLoading}
            className="px-3 py-1 bg-gray-600 text-white rounded w-full md:w-auto"
          >
            Next
          </button>
        </div>
      )}

      {!searchLoading && searchData && searchData.questions.length === 0 && (
        <p className="text-black dark:text-gray-300">
          No questions found{searchTerm && ` for "${searchTerm}"`}.
        </p>
      )}
    </div>
  );
};

export default AdminSearchComponent;
