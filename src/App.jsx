// import React, { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import AdminDashboard from "./Admin/pages/AdminDashboard";
// import QuizPage from "./pages/QuizPage";
// import RegisterPage from "./pages/registerPage";
// import LoginPage from "./pages/LoginPage";
// import QuestionPaperDetailsPage from "./Admin/pages/QuestionPapers/QuestionPaperDetailsPage";
// import { loginSuccess } from "./redux/slice/userSlice";
// import UsersPage from "./Admin/pages/UsersPage";
// import UserDetailsPage from "./Admin/pages/UserDetailsPage";
// import UserResult from "./Admin/pages/UserResult";
// function App() {
//   const dispatch = useDispatch();
//   const { isLoggedIn, user } = useSelector((state) => state.user);

//   // Hydrate Redux state from localStorage on app start
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       dispatch(loginSuccess({ user: storedUser }));
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         <Route
//           path="/dashboard"
//           element={
//             isLoggedIn ? (
//               user?.isAdmin ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/quiz" />
//               )
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />

//         <Route
//           path="/quiz"
//           element={isLoggedIn ? <QuizPage /> : <Navigate to="/" />}
//         />

//         <Route
//           path="/question-paper/:id"
//           element={
//             isLoggedIn ? <QuestionPaperDetailsPage /> : <Navigate to="/login" />
//           }
//         />
//         <Route path="/users" element={<UsersPage />} />
//         <Route path="/users/:uid" element={<UserDetailsPage />} />
//         <Route path="/results/:resultId" element={<UserResult />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slice/userSlice";
import ProtectedRoute from "./route/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import QuizPage from "./pages/QuizPage";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import QuestionPaperDetailsPage from "./Admin/pages/QuestionPapers/QuestionPaperDetailsPage";
import UsersPage from "./Admin/pages/UsersPage";
import UserDetailsPage from "./Admin/pages/UserDetailsPage";
import UserResult from "./Admin/pages/UserResult";

function App() {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  // Hydrate Redux from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loginSuccess({ user: storedUser }));
    }
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) return <div>Loading...</div>; // wait until Redux is ready

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question-paper/:id"
          element={
            <ProtectedRoute>
              <QuestionPaperDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:uid"
          element={
            <ProtectedRoute>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results/:resultId"
          element={
            <ProtectedRoute>
              <UserResult />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
