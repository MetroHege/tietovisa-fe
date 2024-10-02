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
import AdminSearchComponent from "./components/AdminSearchComponent";
import AllQuizzes from "./views/AllQuizzes";

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
              <Route path="/all-quizzes" element={<AllQuizzes />} />{" "}
              {/* Add the new route */}
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
                <Route path="search" element={<AdminSearchComponent />} />
                <Route path="upload-csv" element={<CsvUploadComponent />} />
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
