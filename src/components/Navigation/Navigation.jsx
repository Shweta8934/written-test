import React from "react";

const Navigation = ({
  currentQuestionIndex, // 0-based
  totalQuestions,
  onNext,
  onPrev,
  onSubmit,
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="navigation">
      {currentQuestionIndex > 0 && (
        <button className="nav-btn prev-btn" onClick={onPrev}>
          Previous
        </button>
      )}

      {isLastQuestion ? (
        <button className="nav-btn submit-btn" onClick={onSubmit}>
          Submit
        </button>
      ) : (
        <button className="nav-btn next-btn" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Navigation;
