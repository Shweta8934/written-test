// import React from "react";
// import "./AdminSidebar.css";

// const AdminSidebar = ({ setSelectedOption }) => {
//   return (
//     <div className="admin-sidebar">
//       <div className="sidebar-header">
//         <div className="login-image">
//           <img src="/averybit-new-full.png" alt="Register" />
//         </div>
//       </div>

//       <div className="sidebar-menu">
//         <button
//           className="sidebar-btn"
//           onClick={() => setSelectedOption("user")}
//         >
//           {/* <span className="btn-icon">👤</span> */}
//           <span className="btn-text">User</span>
//         </button>

//         <button
//           className="sidebar-btn"
//           onClick={() => setSelectedOption("generate-question")}
//         >
//           <span className="btn-text">Generate Question</span>
//         </button>

//         <button
//           className="sidebar-btn"
//           onClick={() => setSelectedOption("view-options")}
//         >
//           <span className="btn-text">View Previous Questions</span>
//         </button>

//         <button
//           className="sidebar-btn"
//           onClick={() => setSelectedOption("question-paper")}
//         >
//           <span className="btn-text">Question Paper</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
import React from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/slice/adminSlice"; // adjust path as per your project
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = ({ setSelectedOption }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("admin"); // optional
    navigate("/login");
  };
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="login-image">
          <img src="/averybit-new-full.png" alt="Register" />
        </div>
      </div>

      <div className="sidebar-menu">
        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("user")}
        >
          <span className="btn-text">User</span>
        </button>

        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("generate-question")}
        >
          <span className="btn-text">Generate Question</span>
        </button>

        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("view-options")}
        >
          <span className="btn-text">View Previous Questions</span>
        </button>

        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("question-paper")}
        >
          <span className="btn-text">Question Paper</span>
        </button>

        {/* Logout button */}
        <button className="sidebar-btn logout-btn" onClick={handleLogout}>
          <span className="btn-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
