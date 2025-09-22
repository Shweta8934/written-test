// import React from "react";
// import "./AdminSidebar.css";

// const AdminSidebar = ({ setSelectedOption }) => {
//   return (
//     <div className="admin-sidebar">
//       <div className="sidebar-item" onClick={() => setSelectedOption("user")}>
//         User
//       </div>
//       <div
//         className="sidebar-item"
//         onClick={() => setSelectedOption("generate-question")}
//       >
//         Generate Question
//       </div>
//       <div
//         className="sidebar-item"
//         onClick={() => setSelectedOption("view-options")}
//       >
//         View Previous Questions
//       </div>
//       <div
//         className="sidebar-item"
//         onClick={() => setSelectedOption("question-paper")}
//       >
//         Question Paper
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
import React from "react";
import "./AdminSidebar.css";

const AdminSidebar = ({ setSelectedOption }) => {
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
          {/* <span className="btn-icon">👤</span> */}
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
      </div>
    </div>
  );
};

export default AdminSidebar;
