import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import CsvUploadComponent from "./CsvUploadComponent";
import AdminSearchComponent from "./AdminSearchComponent";


const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 h-screen">
      <h1 className="text-3xl font-bold text-center pt-10 text-black dark:text-white">Dashboard</h1>
      <nav className="flex justify-center space-x-4 mt-4">
        <Button onClick={handleUploadClick}>Lataa CSV tiedosto</Button>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleModalClose}
          ></div>

          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto p-6 z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-white hover:text-gray-700"
              onClick={handleModalClose}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">
              Upload CSV File
            </h2>

            <CsvUploadComponent onUploadComplete={handleModalClose} />
          </div>
        </div>
      )}
      <AdminSearchComponent />
      <Outlet />
    </div>
  );
};

export default Dashboard;
