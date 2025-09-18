import React from "react";
import "./AdminSidebar.css";

const AdminSidebar = ({ setSelectedOption }) => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-item" onClick={() => setSelectedOption("user")}>
        User
      </div>
      <div
        className="sidebar-item"
        onClick={() => setSelectedOption("generate-question")}
      >
        Generate Question
      </div>
      <div
        className="sidebar-item"
        onClick={() => setSelectedOption("view-options")}
      >
        View Previous Questions
      </div>
      <div
        className="sidebar-item"
        onClick={() => setSelectedOption("question-paper")}
      >
        Question Paper
      </div>
    </div>
  );
};

export default AdminSidebar;
