import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/:date" element={<Quiz />} />
              <Route path="/logout" element={<Logout />} />
              {/* <Route path="/all-quizzes" element={<AllQuizzes />} />{" "} */}
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
                <Route path="question" element={<AdminQuestion />} />
                <Route path="upload-csv" element={<CsvUploadComponent />} />
                <Route path="edit-question/:id" element={<AdminEditQuestionPage />} />
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
