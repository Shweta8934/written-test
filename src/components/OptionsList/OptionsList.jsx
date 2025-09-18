import React from "react";

const OptionsList = ({ options, onSelect }) => {
  return (
    <ul className="options-list">
      {options.map((option, index) => (
        <li key={index} className="option-item">
          <button onClick={() => onSelect(option)}>{option}</button>
        </li>
      ))}
    </ul>
  );
};

export default OptionsList;
