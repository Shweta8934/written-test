// import React, { useState } from "react";
// import "./RegisterPage.css";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//     phone: "",
//   });
//   // Get API URL from environment
//   const API_URL = process.env.REACT_APP_API_URL;
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { name, email, password, confirmPassword, address, phone } = formData;

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       const response = await fetch(`${API_URL}/api/users/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           address,
//           phone,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed!");
//       }

//       console.log("API Response:", data);
//       setMessage(data.message);

//       alert("✅ Registration Successful!");
//       // Optionally redirect to login page
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Registration Error:", error);
//       setMessage(error.message);
//       alert("❌ " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-box">
//         <div className="register-image">
//           <img src="/averybit-new-full.png" alt="Register" />
//         </div>
//         <h2>Create Your Account</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="register-button" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         {message && <p className="register-message">{message}</p>}

//         <div className="register-links">
//           <span>Already have an account? </span>
//           <a href="/login">Login Here</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, name, email, address, phone } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, address, phone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed!");

      setMessage(data.message);
      alert("✅ Registration Successful!");
      window.location.href = "/";
    } catch (error) {
      setMessage(error.message);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-image">
          <img src="/averybit-new-full.png" alt="Register" />
        </div>
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password field */}
          <div className="input-group password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Confirm Password field */}
          <div className="input-group password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && <p className="register-message">{message}</p>}

        <div className="register-links">
          <span>Already have an account? </span>
          <a href="/">Login Here</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
