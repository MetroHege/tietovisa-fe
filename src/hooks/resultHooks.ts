import fetchData from "@/lib/fetchData";
import { useApiState } from "./apiHooks";
import { AllResultsResponse, QuizResultResponse, LeaderboardResponse } from "@/types/resultTypes";

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


  const {
    loading: allTimeTopLoading,
    error: allTimeTopError,
    data: allTimeTopData,
    handleApiRequest: handleAllTimeTopApiRequest,
  } = useApiState<LeaderboardResponse[]>();

  const {
    loading: dailyTopLoading,
    error: dailyTopError,
    data: dailyTopData,
    handleApiRequest: handleDailyTopApiRequest,
  } = useApiState<LeaderboardResponse[]>();

  const {
    loading: weeklyTopLoading,
    error: weeklyTopError,
    data: weeklyTopData,
    handleApiRequest: handleWeeklyTopApiRequest,
  } = useApiState<LeaderboardResponse[]>();

  const getAllTimeTopUsers = (): Promise<LeaderboardResponse[]> => {
    return handleAllTimeTopApiRequest(async () => {
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/all-time-top`;
      return await fetchData<LeaderboardResponse[]>(url);
    });
  };

  const getDailyTopUsers = (): Promise<LeaderboardResponse[]> => {
    return handleDailyTopApiRequest(async () => {
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/daily-top`;
      return await fetchData<LeaderboardResponse[]>(url);
    });
  };

  const getWeeklyTopUsers = (): Promise<LeaderboardResponse[]> => {
    return handleWeeklyTopApiRequest(async () => {
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/weekly-top`;
      return await fetchData<LeaderboardResponse[]>(url);
    });
  };

  const getAllResultsByUserId = (userId: string): Promise<AllResultsResponse> => {
    return handleAllResultsApiRequest(async () => {
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/all?userId=${userId}`;
      return await fetchData<AllResultsResponse>(url);
    });
  };

  const getQuizResultByQuizId = (quizId: string, userId: string): Promise<QuizResultResponse> => {
    return handleQuizResultApiRequest(async () => {
      const url = `${import.meta.env.VITE_TIETOVISA_API}/result/${quizId}?userId=${userId}`;
      return await fetchData<QuizResultResponse>(url);
    });
  };

  return {
    getAllResultsByUserId,
    getQuizResultByQuizId,
    getAllTimeTopUsers,
    getDailyTopUsers,
    getWeeklyTopUsers,
    allResultsLoading,
    allResultsError,
    allResultsData,
    quizResultLoading,
    quizResultError,
    quizResultData,
    allTimeTopLoading,
    allTimeTopError,
    allTimeTopData,
    dailyTopLoading,
    dailyTopError,
    dailyTopData,
    weeklyTopLoading,
    weeklyTopError,
    weeklyTopData,
  };
};

export default useResult;
