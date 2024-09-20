import fetchData from "@/lib/fetchData";
import { Quiz, PopulatedQuiz, deleteQuizResponse } from "../types/quizTypes";
import { useApiState } from "./apiHooks";

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

  return {
    quizzesData,
    quizData,
    quizzesLoading,
    quizLoading,
    deleteLoading,
    quizzesError,
    quizError,
    deleteError,
    getQuizzes,
    getQuizById,
    getQuizzesByDate,
    postQuiz,
    putQuiz,
    deleteQuiz,
  };
};

export default useQuiz;
