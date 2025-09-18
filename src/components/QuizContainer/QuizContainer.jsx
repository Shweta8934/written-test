// // import React from "react";
// // import "./QuizContainer.css";
// // import QuestionCard from "../QuestionCard/QuestionCard";
// // import Timer from "../Timer/Timer";
// // import Navigation from "../Navigation/Navigation";

// // const QuizContainer = () => {
// //   // Hardcoded data for demonstration. In a real app, this would come from an API or state.
// //   const questionNumber = 7;
// //   const totalQuestions = 10;
// //   const questionText =
// //     "What is the name of the process that sends one qubit of information using two bits of classical information?";
// //   const options = [
// //     { id: "A", text: "Quantum Teleportation" },
// //     { id: "B", text: "Quantum Entanglement" },
// //     { id: "C", text: "Quantum Programming" },
// //     { id: "D", text: "Super Dense Coding" },
// //   ];

// //   return (
// //     <div className="quiz-container">
// //       <div className="quiz-header">
// //         <div className="question-info">
// //           <span className="info-icon">
// //             <i className="fas fa-info-circle"></i> {/* Requires Font Awesome */}
// //           </span>
// //           <span className="question-number">
// //             Question No.{questionNumber} of {totalQuestions}
// //           </span>
// //         </div>
// //         <Timer minutes={4} seconds={28} />
// //       </div>
// //       <QuestionCard question={questionText} options={options} />
// //       <Navigation />
// //     </div>
// //   );
// // };

// // export default QuizContainer;
// import React from "react";
// import "./QuizContainer.css";
// import QuestionCard from "../QuestionCard/QuestionCard";
// import Timer from "../Timer/Timer";
// import Navigation from "../Navigation/Navigation";

// const QuizContainer = ({
//   question,
//   currentQuestionNumber,
//   totalQuestions,
//   time,
//   onNext,
//   onPrev,
// }) => {
//   return (
//     <div className="quiz-container">
//       <div className="quiz-header">
//         <div className="question-info">
//           <span className="info-icon">
//             <i className="fas fa-info-circle"></i>
//           </span>
//           <span className="question-number">
//             Question No.{currentQuestionNumber} of {totalQuestions}
//           </span>
//         </div>
//         <Timer time={time} />
//       </div>
//       <QuestionCard question={question.question} options={question.options} />
//       <Navigation
//         onNext={onNext}
//         onPrev={onPrev}
//         isFirst={currentQuestionNumber === 1}
//         isLast={currentQuestionNumber === totalQuestions}
//       />
//     </div>
//   );
// };

// export default QuizContainer;
const QuizContainer = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  time,
  onNext,
  onPrev,
  onAnswerChange,
}) => {
  const handleAnswerSubmit = (answer) => {
    onAnswerChange(currentQuestionNumber, answer);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="question-info">
          <span className="info-icon">
            <i className="fas fa-info-circle"></i>
          </span>
          <span className="question-number">
            Question No.{currentQuestionNumber} of {totalQuestions}
          </span>
        </div>
        <Timer time={time} />
      </div>

      <QuestionCard
        question={question}
        selectedOption={question.selectedOption}
        onSelect={(option) => onAnswerChange(currentQuestionNumber, option)}
        onAnswerSubmit={handleAnswerSubmit}
      />

      <Navigation
        onNext={onNext}
        onPrev={onPrev}
        isFirst={currentQuestionNumber === 1}
        isLast={currentQuestionNumber === totalQuestions}
      />
    </div>
  );
};

export default QuizContainer;
