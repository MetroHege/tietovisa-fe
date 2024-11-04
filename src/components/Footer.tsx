import { Link } from "react-router-dom";
import {
  FaHome,
  FaList,
  FaShieldAlt,
  FaEnvelope,
  FaCookieBite,
  FaFileContract,
} from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          &copy; 2024 Kymppivisa. All rights reserved.
        </p>
        {/* Flex layout on larger screens, stack vertically on smaller screens */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
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
            to="/privacy-statement"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaShieldAlt className="mr-2" /> Tietosuojalauseke
          </Link>
          <Link
            to="/cookie-policy"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaCookieBite className="mr-2" /> Evästekäytäntö
          </Link>
          <Link
            to="/terms-of-use"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
          >
            <FaFileContract className="mr-2" /> Käyttöehdot
          </Link>
          <Link
            to="/contact"
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
