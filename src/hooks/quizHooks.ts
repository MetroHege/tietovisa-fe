import fetchData from "@/lib/fetchData";
import { Quiz, PopulatedQuiz, deleteQuizResponse } from "../types/quizTypes";
import { useApiState } from "./apiHooks";
import { CountResponse } from "@/types/questionTypes";

const useQuiz = () => {
  // For handling quizzes data
  const {
    loading: quizzesLoading,
    error: quizzesError,
    data: quizzesData,
    handleApiRequest: handleQuizzesApiRequest,
  } = useApiState<PopulatedQuiz[]>();

  // For handling a single quiz
  const {
    loading: quizLoading,
    error: quizError,
    data: quizData,
    handleApiRequest: handleQuizApiRequest,
  } = useApiState<PopulatedQuiz>();

  // For handling delete quiz response
  const {
    loading: deleteLoading,
    error: deleteError,
    handleApiRequest: handleDeleteApiRequest,
  } = useApiState<deleteQuizResponse>();

  const {
    loading: countLoading,
    error: countError,
    data: countData,
    handleApiRequest: handleCountApiRequest,
  } = useApiState<CountResponse>();

  const getQuizzes = (): Promise<PopulatedQuiz[]> => {
    return handleQuizzesApiRequest(async () => {
      return await fetchData<PopulatedQuiz[]>(import.meta.env.VITE_TIETOVISA_API + '/quiz');
    });
  };

  const getQuizById = (id: string): Promise<PopulatedQuiz> => {
    return handleQuizApiRequest(async () => {
      return await fetchData<PopulatedQuiz>(import.meta.env.VITE_TIETOVISA_API + '/quiz/' + id);
    });
  };

  const getQuizzesByDate = (date: string): Promise<PopulatedQuiz> => {
    return handleQuizApiRequest(async () => {
      return await fetchData<PopulatedQuiz>(import.meta.env.VITE_TIETOVISA_API + '/quiz/date?date=' + date);
    });
  };

  const postQuiz = (quiz: Quiz): Promise<PopulatedQuiz> => {
    return handleQuizApiRequest(async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      };
      return await fetchData<PopulatedQuiz>(import.meta.env.VITE_TIETOVISA_API + '/quiz', options);
    });
  };

  const putQuiz = (id: string, quiz: Partial<Quiz>): Promise<PopulatedQuiz> => {
    return handleQuizApiRequest(async () => {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      };
      return await fetchData<PopulatedQuiz>(import.meta.env.VITE_TIETOVISA_API + '/quiz/' + id, options);
    });
  };

  const deleteQuiz = (id: string): Promise<deleteQuizResponse> => {
    return handleDeleteApiRequest(async () => {
      const options = {
        method: "DELETE",
      };
      return await fetchData<deleteQuizResponse>(
        import.meta.env.VITE_TIETOVISA_API + '/quiz/' + id,
        options
      );
    });
  };

  const getQuizCount = (): Promise<CountResponse> => {
    return handleCountApiRequest(async () => {
      const token = localStorage.getItem("token");
      return await fetchData<CountResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/quiz/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });
  };

  const getQuizzesByDateRange = (startDate: string, endDate: string): Promise<PopulatedQuiz[]> => {
    return handleQuizzesApiRequest(async () => {
      const token = localStorage.getItem('token')
      const url = `${import.meta.env.VITE_TIETOVISA_API}/quiz/date-range?startDate=${startDate}&endDate=${endDate}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      return await fetchData<PopulatedQuiz[]>(url, options);
    });
  };

  return {
    quizzesData,
    quizData,
    quizzesLoading,
    quizLoading,
    deleteLoading,
    countLoading,
    quizzesError,
    quizError,
    deleteError,
    countError,
    getQuizzes,
    getQuizById,
    getQuizzesByDate,
    postQuiz,
    putQuiz,
    deleteQuiz,
    getQuizCount,
    countData,
    getQuizzesByDateRange,
  };
};

export default useQuiz;
