import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import UserPage from "../pages/UsersPage";
import GenerateQuestionPage from "../pages/GenerateQuestionsPage";
import ViewOptionsPage from "./QuestionList";
import "./AdminDashboard.css";
import QuestionPapers from "./QuestionPapers/QuestionPapers";
import QuestionList from "./QuestionList";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("user");

  const renderContent = () => {
    switch (selectedOption) {
      case "user":
        return <UserPage />;
      case "generate-question":
        return <GenerateQuestionPage />;
      case "view-options":
        return <QuestionList />;
      case "question-paper":
        return <QuestionPapers />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <>
      <div className="admin-dashboard-container">
        <AdminSidebar setSelectedOption={setSelectedOption} />
        <div className="admin-content-area">{renderContent()}</div>
      </div>
    </>
  );
};

export default AdminDashboard;
