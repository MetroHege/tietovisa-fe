import fetchData from "@/lib/fetchData";
import { useApiState } from "./apiHooks";
import { AllResultsResponse, QuizResultResponse } from "@/types/resultTypes";

const useResult = () => {
  const {
    loading: allResultsLoading,
    error: allResultsError,
    data: allResultsData,
    handleApiRequest: handleAllResultsApiRequest,
  } = useApiState<AllResultsResponse>();

  const {
    loading: quizResultLoading,
    error: quizResultError,
    data: quizResultData,
    handleApiRequest: handleQuizResultApiRequest,
  } = useApiState<QuizResultResponse>();

  const getAllResultsByUserId = (userId: string): Promise<AllResultsResponse> => {
    return handleAllResultsApiRequest(async () => {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/all?userId=${userId}`;
      return await fetchData<AllResultsResponse>(url, options);
    });
  };

  const getQuizResultByQuizId = (quizId: string, userId: string): Promise<QuizResultResponse> => {
    return handleQuizResultApiRequest(async () => {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/${quizId}?userId=${userId}`;
      return await fetchData<QuizResultResponse>(url, options);
    });
  };

  return {
    getAllResultsByUserId,
    getQuizResultByQuizId,
    allResultsLoading,
    allResultsError,
    allResultsData,
    quizResultLoading,
    quizResultError,
    quizResultData,
  };
};

export default useResult;
