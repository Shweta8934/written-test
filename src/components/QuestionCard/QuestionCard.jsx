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
    if (question.type === "short") setAnswer(question.answer || "");
    else if (question.type === "coding")
      setAnswer(question.code || "// Write your code here...");
    else setAnswer("");
  }, [question]);

  const handleInputChange = (value) => {
    setAnswer(value);
    onAnswerSubmit && onAnswerSubmit(value);
  };

  return (
    <div className="question-card">
      <p className="question-text">Q. {question.question}</p>

      {question.type === "mcq" && (
        <OptionsList
          options={question.options}
          onSelect={onSelect}
          selectedOption={selectedOption}
        />
      )}

      {question.type === "short" && (
        <input
          type="text"
          className="short-answer-input"
          value={answer}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type your answer here..."
        />
      )}

      {question.type === "coding" && (
        <CodingEditor
          language={question.language || "JavaScript"}
          onCodeChange={handleInputChange}
        />
      )}
    </div>
  );
};
export default QuestionCard;
