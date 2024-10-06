import {
  CountResponse,
  Question,
  QuestionResponse,
  SearchResponse,
} from "@/types/questionTypes";
import { useApiState } from "./apiHooks";
import fetchData from "@/lib/fetchData";

const useQuestion = () => {
  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
    handleApiRequest: handleQuestionSearchApiRequest,
  } = useApiState<SearchResponse>();

  const searchQuestions = (
    searchTerm: string,
    page: number = 1,
    limit: number = 50
  ): Promise<SearchResponse> => {
    return handleQuestionSearchApiRequest(async () => {
      const token = localStorage.getItem("token");
      const url = new URL(
        `${import.meta.env.VITE_TIETOVISA_API}/questions/search`
      );

      if (searchTerm) {
        url.searchParams.append("q", searchTerm);
      }
      if (page) {
        url.searchParams.append("page", page.toString());
      }
      if (limit) {
        url.searchParams.append("limit", limit.toString());
      }

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await fetchData<SearchResponse>(url.toString(), options);
    });
  };

  const {
    loading: questionLoading,
    error: questionError,
    data: questionData,
    handleApiRequest: handleQuestionApiRequest,
  } = useApiState<QuestionResponse>();

  const getQuestionById = (id: string): Promise<QuestionResponse> => {
    return handleQuestionApiRequest(async () => {
      return await fetchData<QuestionResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/questions/${id}`
      );
    });
  };

  const {
    loading: updateLoading,
    error: updateError,
    data: updateData,
    handleApiRequest: handleUpdateApiRequest,
  } = useApiState<QuestionResponse>();

  const updateQuestion = (
    id: string,
    updatedData: Partial<Question>
  ): Promise<QuestionResponse> => {
    return handleUpdateApiRequest(async () => {
      const token = localStorage.getItem("token");
      return await fetchData<QuestionResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/questions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
    });
  };

  const {
    loading: countLoading,
    error: countError,
    data: countData,
    handleApiRequest: handleCountApiRequest,
  } = useApiState<CountResponse>();

  const getQuestionCount = (): Promise<CountResponse> => {
    return handleCountApiRequest(async () => {
      const token = localStorage.getItem("token");
      return await fetchData<CountResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/questions/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });
  };

  const {
    loading: createLoading,
    error: createError,
    data: createData,
    handleApiRequest: handleCreateApiRequest,
  } = useApiState<QuestionResponse>();

  const createQuestion = (
    questionData: { questionText: string; date: string; answers: { text: string; isCorrect: boolean }[] }
  ): Promise<QuestionResponse> => {
    return handleCreateApiRequest(async () => {
      const token = localStorage.getItem("token");
      return await fetchData<QuestionResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(questionData),
        }
      );
    });
  };




  return {
    searchQuestions,
    searchLoading,
    searchError,
    searchData,
    getQuestionById,
    questionLoading,
    questionError,
    questionData,
    updateQuestion,
    updateLoading,
    updateError,
    updateData,
    getQuestionCount,
    countLoading,
    countError,
    countData,
    createQuestion,
    createLoading,
    createError,
    createData,
  };
};

export { useQuestion };
