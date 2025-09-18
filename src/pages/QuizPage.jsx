import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import Navigation from "../components/Navigation/Navigation";
import StartScreen from "../components/StartScreen/StartScreen";
import Timer from "../components/Timer/Timer";
import questionsData from "../data";
import "../App.css";

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSelectOption = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option,
    });
  };

  const handleSubmit = () => {
    alert("Quiz submitted! Your answers will be reviewed.");
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return <StartScreen onStart={handleStartQuiz} />;
  }

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <div className="main-content">
        <div className="question-info-bar">
          <div className="question-number">
            Question No. {currentQuestionIndex + 1} of {questionsData.length}
          </div>
          <div className="timer-container">
            <Timer totalTime={3600} />
          </div>
        </div>
        <QuestionCard
          question={currentQuestion}
          onSelect={handleSelectOption}
        />
        <Navigation
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionsData.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default QuizPage;
