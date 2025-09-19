import React from "react";
import OptionsList from "../OptionsList/OptionsList";
import "./Result.css";

const Result = ({ questions, onRestart }) => {
  const totalCorrect = questions.filter(
    (q) => q.selectedOption === q.answer
  ).length;

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>Quiz Result</h2>
        <p className="score">
          You scored <span className="correct-count">{totalCorrect}</span> out
          of <span className="total-count">{questions.length}</span>
        </p>
      </div>

      <div className="questions-list">
        {questions.map((q, idx) => (
          <div key={idx} className="result-question-card">
            <p className="question-text">
              <strong>Q{idx + 1}:</strong> {q.question}
            </p>

            {/* MCQ Questions */}
            {q.questionType === "mcq" && (
              <OptionsList
                options={q.options}
                selectedOption={q.selectedOption}
                correctAnswer={q.answer}
                showResult={true}
              />
            )}

            {/* One-line questions */}
            {q.questionType === "one-line" && (
              <div className="answer-block">
                <p>
                  <span className="label">Your answer:</span>{" "}
                  <span
                    className={
                      q.selectedOption === q.answer ? "correct" : "wrong"
                    }
                  >
                    {q.selectedOption || "Not answered"}
                  </span>
                </p>
                <p>
                  <span className="label">Correct answer:</span>{" "}
                  <span className="correct">{q.answer}</span>
                </p>
              </div>
            )}

            {/* Coding questions */}
            {q.questionType === "coding" && (
              <div className="answer-block">
                <p className="code-label">Your code:</p>
                <pre className="code-block">
                  {q.selectedOption || "// Not answered"}
                </pre>
                <p className="code-label">Correct code:</p>
                <pre className="code-block correct-code">
                  {q.answer || "// No answer provided"}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
