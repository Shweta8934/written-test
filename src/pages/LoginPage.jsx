// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/slice/userSlice";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get API URL from environment
//   const API_URL = process.env.REACT_APP_API_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // reset error

//     const userData = { email, password };

//     try {
//       const response = await fetch(`${API_URL}/api/users/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//       console.log(response);
//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         // API returned successful login
//         dispatch(loginSuccess({ isAdmin: data.isAdmin, user: { email } }));

//         // Optionally, store token in localStorage or Redux
//         localStorage.setItem("token", data.token);

//         // Redirect based on role
//         if (data.isAdmin) {
//           navigate("/dashboard");
//         } else {
//           navigate("/quiz");
//         }
//       } else {
//         // API returned error
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image">
//         <img src="/averybit-new-full.png" alt="Register" />
//       </div>
//       <h2>Please Log In to Start the Quiz</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-grid">
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {error && <p className="error">{error}</p>}

//         <button type="submit">Start Quiz</button>
//       </form>

//       <div className="register-link">
//         <p>
//           Don’t have an account? <Link to="/">Register here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/userSlice";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info & token in localStorage
        const userData = { email, isAdmin: data.isAdmin };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);

        // Update Redux
        dispatch(loginSuccess({ user: userData }));

        // Redirect based on role
        navigate(data.isAdmin ? "/dashboard" : "/quiz");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/averybit-new-full.png" alt="Register" />
      </div>

      <h2>Please Log In to Start the Quiz</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Start Quiz</button>
      </form>

      <div className="register-link">
        <p>
          Don’t have an account? <Link to="/">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
