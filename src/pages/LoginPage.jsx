import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/userSlice";
import "./LoginPage.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loader state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ show loader

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = { email, isAdmin: data.isAdmin };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        dispatch(loginSuccess({ user: userData }));
        navigate(data.isAdmin ? "/dashboard" : "/quiz");
      } else {
        setError(data.message || "Login failed");
        setLoading(false); // ❌ hide loader on error
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* ✅ Fullscreen Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="login-image">
        <img src="/averybit-new-full.png" alt="Register" />
      </div>

      {/* <h2>Log In </h2> */}
      <h4 className="login-title"> Enter your details</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="register-link">
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
