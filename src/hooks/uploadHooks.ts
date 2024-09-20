import fetchData from "@/lib/fetchData";
import { CsvUploadResponse } from "@/types/quizTypes";
import { useApiState } from "./apiHooks";


const useUpload = () => {
  const {
    loading: uploadLoading,
    error: uploadError,
    data: uploadData,
    handleApiRequest: handleUploadApiRequest,
  } = useApiState<CsvUploadResponse>();

  const uploadCsv = (file: File): Promise<CsvUploadResponse> => {
    return handleUploadApiRequest(async () => {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      return await fetchData<CsvUploadResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/questions/upload-questions`,
        options
      );
    });
  };

  return {
    uploadCsv,
    uploadLoading,
    uploadError,
    uploadData,
  };
};

export default useUpload;
