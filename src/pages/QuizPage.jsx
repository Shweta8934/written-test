import React, { useState } from "react";
import StartScreen from "../components/StartScreen/StartScreen";
import Timer from "../components/Timer/Timer";
import QuizContainer from "../components/QuizContainer/QuizContainer";
import "../App.css";

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  // 🔹 Get userId from localStorage
  const userId = localStorage.getItem("userId");
  console.log("UserId from localStorage:", userId);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return <StartScreen onStart={handleStartQuiz} />;
  }

  return (
    <div className="quiz-page">
      <div className="main-content">
        <QuizContainer userId={userId} />
      </div>
    </div>
  );
};

export default QuizPage;
