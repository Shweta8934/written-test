import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";
import QuestionPaperDetailsPage from "./Admin/pages/QuestionPapers/QuestionPaperDetailsPage";
import { loginSuccess } from "./redux/slice/userSlice";
import UsersPage from "./Admin/pages/UsersPage";
import UserDetailsPage from "./Admin/pages/UserDetailsPage";
import UserResult from "./Admin/pages/UserResult";
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  // Hydrate Redux state from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loginSuccess({ user: storedUser }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              user?.isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/quiz" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/quiz"
          element={isLoggedIn ? <QuizPage /> : <Navigate to="/" />}
        />

        <Route
          path="/question-paper/:id"
          element={
            isLoggedIn ? <QuestionPaperDetailsPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:uid" element={<UserDetailsPage />} />
        <Route path="/results/:resultId" element={<UserResult />} />
      </Routes>
    </Router>
  );
}

export default App;
