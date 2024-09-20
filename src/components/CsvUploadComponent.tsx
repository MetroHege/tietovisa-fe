import React, { useState, useEffect } from "react";
import useUpload from "@/hooks/uploadHooks";

interface CsvUploadComponentProps {
  onUploadComplete?: () => void;
}

const CsvUploadComponent: React.FC<CsvUploadComponentProps> = ({
  onUploadComplete,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const { uploadCsv, uploadLoading, uploadError, uploadData } = useUpload();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setMessage("Please select a valid CSV file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setMessage("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    try {
      setMessage("");
      await uploadCsv(file);
      // Do not check uploadData or uploadError here
    } catch (error) {
      setMessage(`An error occurred: ${(error as Error).message}`);
    }
  };

  // Use useEffect to react to changes in uploadData and uploadError
  useEffect(() => {
    if (uploadError) {
      setMessage(`Error: ${uploadError}`);
    } else if (uploadData) {
      setMessage(uploadData.message);
      if (onUploadComplete) {
        onUploadComplete();
      }
    }
  }, [uploadError, uploadData, onUploadComplete]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select CSV File:
          </label>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300
              border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={uploadLoading}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none ${
            uploadLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploadLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default CsvUploadComponent;
