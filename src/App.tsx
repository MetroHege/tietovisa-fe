import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Secret from "./views/Secret";
import Logout from "./views/Logout";
import Quiz from "./views/Quiz";
import { ThemeProvider } from "./contexts/ThemeContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Dashboard from "./components/Dashboard";
import CsvUploadComponent from "./components/CsvUploadComponent";
import AdminEditQuestionPage from "./components/AminEditQuestionPage";
import AdminUserPage from "./components/AdminUserPage";
import AdminUserEditPage from "./components/AdminUserEditPage";
import AdminHome from "./components/AdminHome";
import AdminQuestion from "./components/AdminQuestion";
import AdminQuiz from "./components/AdminQuiz";
import AllQuizzes from "./views/AllQuizzes";
import Profile from "./views/Profile";
import Contact from "./views/Contact";
import TermsOfUse from "./views/TermsOfUse";
import CookiePolicy from "./views/CookiePolicy";
import PrivacyStatement from "./views/PrivacyStatement";
import AdminQuizDetail from "./components/AdminQuizDetail";
import Leaderboard from "./views/Leaderboard";

function App() {
  useEffect(() => {
    document.documentElement.lang = "fi";
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/date/:date" element={<Quiz />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/all-quizzes" element={<AllQuizzes />} />{" "}
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/privacy-statement" element={<PrivacyStatement />} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route
                path="/secret"
                element={
                  <ProtectedRoute>
                    <Secret />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <AdminProtectedRoute>
                    <Dashboard />
                  </AdminProtectedRoute>
                }
              >
                {/* Default route for /dashboard */}
                <Route index element={<AdminHome />} />

                {/* Additional admin routes */}
                <Route path="quiz" element={<AdminQuiz />} />
                <Route path="quiz/:quizId" element={<AdminQuizDetail />} />
                <Route path="question" element={<AdminQuestion />} />
                <Route path="upload-csv" element={<CsvUploadComponent />} />
                <Route
                  path="edit-question/:id"
                  element={<AdminEditQuestionPage />}
                />
                <Route path="users" element={<AdminUserPage />} />
                <Route path="edit-user/:id" element={<AdminUserEditPage />} />
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
