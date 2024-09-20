import { SearchResponse } from "@/types/questionTypes";
import { useApiState } from "./apiHooks";
import fetchData from "@/lib/fetchData";

const useQuestion = () => {
  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
    handleApiRequest: handleQuestionApiRequest,
  } = useApiState<SearchResponse>();

  const searchQuestions = (
    searchTerm: string,
    page: number = 1,
    limit: number = 50
  ): Promise<SearchResponse> => {
    return handleQuestionApiRequest(async () => {
      const token = localStorage.getItem("token");
      const url = new URL(`${import.meta.env.VITE_TIETOVISA_API}/questions/search`);

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

  return {
    searchQuestions,
    searchLoading,
    searchError,
    searchData,
  };
};

export { useQuestion };
