import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to the Question Paper!</h1>
      <div className="disclaimer">
        <p>
          <strong>Important Notice:</strong>
        </p>
        <p>
          Please read the following instructions carefully before starting the
          question paper:
        </p>
        <ul>
          <li>
            The question paper duration is <strong>1 hour</strong>. Ensure you
            have sufficient time to complete it in one sitting.
          </li>
          <li>
            The question paper will include a mix of question types:
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
          <li>
            Ensure a stable internet connection before starting the question
            paper.
          </li>
        </ul>
        <p>
          By clicking "Start Question Paper", you acknowledge that you have read
          and understood these instructions and are ready to begin.
        </p>
      </div>
      <button onClick={onStart}>Start Question Paper</button>
    </div>
  );
};

export default StartScreen;
