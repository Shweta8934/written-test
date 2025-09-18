import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz!</h1>
      <div className="disclaimer">
        <p>
          <strong>Important Notice:</strong>
        </p>
        <p>
          Please read the following instructions carefully before starting the
          quiz:
        </p>
        <ul>
          <li>
            The quiz duration is <strong>1 hour</strong>. Ensure you have
            sufficient time to complete it in one sitting.
          </li>
          <li>
            The quiz will include a mix of question types:
            <ul>
              <li>Multiple Choice Questions (MCQs)</li>
              <li>One-line answer questions</li>
              <li>Coding questions</li>
            </ul>
          </li>
          <li>
            All answers must be submitted within the allotted time; late
            submissions will not be accepted.
          </li>
          <li>Ensure a stable internet connection before starting the quiz.</li>
        </ul>
        <p>
          By clicking "Start Quiz", you acknowledge that you have read and
          understood these instructions and are ready to begin.
        </p>
      </div>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;
