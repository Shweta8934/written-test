import React, { useEffect, useState } from "react";
import OptionsList from "../OptionsList/OptionsList";
import CodingEditor from "../CodingEditor/CodingEditor";
import "./QuestionCard.css";

const QuestionCard = ({
  question,
  onSelect,
  selectedOption,
  onAnswerSubmit,
}) => {
  const [answer, setAnswer] = useState("");

  // Reset answer whenever the question changes
  useEffect(() => {
    if (question.questionType === "one-line") {
      setAnswer(question.selectedOption || "");
    } else if (question.questionType === "coding") {
      setAnswer(question.selectedOption || "// Write your code here...");
    } else {
      setAnswer(question.selectedOption || "");
    }
  }, [question]);

  const handleInputChange = (value) => {
    setAnswer(value);
    onAnswerSubmit && onAnswerSubmit(value);
  };

  return (
    <div className="question-card">
      <p className="question-text">Q. {question.question}</p>

      {question.questionType === "mcq" && question.options && (
        <OptionsList
          options={question.options}
          selectedOption={selectedOption}
          onSelect={onSelect}
        />
      )}

      {question.questionType === "one-line" && (
        <input
          type="text"
          className="short-answer-input"
          value={answer}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type your answer here..."
        />
      )}

      {question.questionType === "coding" && (
        <CodingEditor
          language={question.language || "JavaScript"}
          initialCode={answer}
          onCodeChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default QuestionCard;
