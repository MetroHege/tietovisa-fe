import { useUser } from "@/hooks/apiHooks";
import { useQuestion } from "@/hooks/questionHooks";
import useQuiz from "@/hooks/quizHooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const {
    getQuestionCount,
    countData: questionCountData,
    countLoading: questionCountLoading,
    countError: questionCountError,
  } = useQuestion();

  const {
    getQuizCount,
    countData: quizCountData,
    countLoading: quizCountLoading,
    countError: quizCountError,
  } = useQuiz();

  const {
    getUsersCount,
    usersCountData,
    usersCountLoading,
    usersCountError,
  } = useUser();

  useEffect(() => {
    getQuestionCount();
    getQuizCount();
    getUsersCount();
  }, []);

  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 w-full max-w-screen-lg h-[100px]">
        {/* Question Count Box */}
        <Link to="/dashboard/question">
          <div className="p-2 md:p-6 rounded-lg shadow-lg bg-gray-600 text-white">
            {questionCountLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white mx-auto"></div>
            ) : questionCountError ? (
              <div className="text-red-400">Failed to load question count</div>
            ) : (
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Questions</h2>
                <p className="text-xl mt-2">{questionCountData?.count ?? 0}</p>
              </div>
            )}
          </div>
        </Link>

        {/* Quiz Count Box */}
        <Link to="/dashboard/quiz">
          <div className="p-2 md:p-6 rounded-lg shadow-lg bg-gray-600 text-white">
            {quizCountLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white mx-auto"></div>
            ) : quizCountError ? (
              <div className="text-red-400">Failed to load quiz count</div>
            ) : (
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Quizzes</h2>
                <p className="text-xl mt-2">{quizCountData?.count ?? 0}</p>
              </div>
            )}
          </div>
        </Link>

        {/* User Count Box */}
        <Link to="/dashboard/users">
          <div className="p-2 md:p-6 rounded-lg shadow-lg bg-gray-600 text-white">
            {usersCountLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white mx-auto"></div>
            ) : usersCountError ? (
              <div className="text-red-400">Failed to load user count</div>
            ) : (
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Users</h2>
                <p className="text-xl mt-2">
                  {usersCountData?.totalUsers ?? 0}
                </p>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
