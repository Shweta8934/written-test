import React from "react";
import "./OptionsList.css";

const OptionsList = ({
  options,
  onSelect,
  selectedOption,
  correctAnswer,
  showResult = false, // true when showing results
}) => {
  return (
    <ul className="options-list">
      {options.map((option, index) => {
        const optionText = option.text || option;

        let className = "option-button";

        if (showResult) {
          if (optionText === correctAnswer) className += " correct";
          else if (
            optionText === selectedOption &&
            optionText !== correctAnswer
          )
            className += " wrong";
        } else if (optionText === selectedOption) {
          className += " selected"; // Highlight during quiz
        }

        return (
          <li key={index} className="option-item">
            <button
              className={className}
              onClick={() => !showResult && onSelect(optionText)}
            >
              {optionText}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default OptionsList;
