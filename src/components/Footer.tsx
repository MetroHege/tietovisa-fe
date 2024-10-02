import { Link } from "react-router-dom";
import { FaHome, FaList, FaShieldAlt, FaEnvelope } from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          &copy; 2024 Tietovisasaitti. All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <Link
            to="/"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaHome className="mr-2" /> Etusivu
          </Link>
          <Link
            to="/all-quizzes"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaList className="mr-2" /> Kaikki visat
          </Link>
          <Link
            to="/privacy"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaShieldAlt className="mr-2" /> Tietosuojakäytäntö
          </Link>
          <Link
            to="/yhteydenotto"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaEnvelope className="mr-2" /> Yhteydenotto
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
