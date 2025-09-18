// // import React from "react";
// // import "./QuestionSelectionPage.css"; // Reuse the same CSS file

// // const QuestionSelectionPage = ({
// //   filteredQuestions,
// //   selectedQuizQuestions,
// //   handleAddQuestion,
// //   handleRemoveQuestion,
// //   handleBack,
// //   handleSave,
// // }) => {
// //   return (
// //     <div className="form-container">
// //       <h2>Select Questions</h2>
// //       <p className="selection-info">
// //         Selected Questions: {selectedQuizQuestions.length}
// //       </p>
// //       <div className="question-list">
// //         {filteredQuestions.map((question, index) => {
// //           const isSelected = selectedQuizQuestions.some(
// //             (q) => q.question === question.question
// //           );

// //           // Check if any question is already selected to disable other "Add" buttons
// //           const isAnyQuestionSelected = selectedQuizQuestions.length > 0;

// //           return (
// //             <div key={index} className="question-item">
// //               <p>{question.question}</p>
// //               <button
// //                 className={`add-button ${isSelected ? "remove" : ""}`}
// //                 onClick={() => {
// //                   if (isSelected) {
// //                     handleRemoveQuestion(question);
// //                   } else {
// //                     // If a question is already selected, remove it first
// //                     // This assumes the parent component handles state correctly
// //                     if (isAnyQuestionSelected) {
// //                       // This part should technically be handled by the parent component,
// //                       // but we can simulate the single-select behavior here by calling remove.
// //                       // Note: A more robust solution is to handle this logic in the parent component.
// //                       handleRemoveQuestion(selectedQuizQuestions[0]);
// //                     }
// //                     handleAddQuestion(question);
// //                   }
// //                 }}
// //                 disabled={isAnyQuestionSelected && !isSelected}
// //               >
// //                 {isSelected ? "Remove" : "Add"}
// //               </button>
// //             </div>
// //           );
// //         })}
// //       </div>
// //       <div className="button-group">
// //         <button className="back-button" onClick={handleBack}>
// //           Back
// //         </button>
// //         <button
// //           className="save-button"
// //           onClick={handleSave}
// //           disabled={selectedQuizQuestions.length === 0}
// //         >
// //           Save Quiz
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default QuestionSelectionPage;
// // src/admin/pages/QuestionSelectionPage.jsx

// import React, { useState } from "react";
// import "./QuestionSelectionPage.css";

// const QuestionSelectionPage = ({
//   filteredQuestions,
//   selectedQuizQuestions,
//   handleAddQuestion,
//   handleRemoveQuestion,
//   handleBack,
//   handleSave,
// }) => {
//   const [userAnswers, setUserAnswers] = useState({});

//   const handleAnswerChange = (index, value) => {
//     setUserAnswers({ ...userAnswers, [index]: value });
//   };

//   return (
//     <div className="form-container">
//       <h2>Select Questions</h2>
//       <p className="selection-info">
//         Choose from the filtered questions and add them to your quiz.
//       </p>

//       {/* Questions List */}
//       <div className="question-list">
//         {filteredQuestions.map((q, index) => (
//           <div key={index} className="question-item">
//             <div className="question-content">
//               <p>
//                 <b>Q{index + 1}:</b> {q.question}
//               </p>

//               {/* MCQ questions */}
//               {q.questionType === "quiz" && (
//                 <div className="options">
//                   {q.options?.map((opt, i) => (
//                     <label key={i} className="option-label">
//                       <input type="radio" name={`q-${index}`} value={opt} />
//                       {opt}
//                     </label>
//                   ))}
//                 </div>
//               )}

//               {/* One-line questions */}
//               {q.questionType === "one-line" && (
//                 <input
//                   type="text"
//                   placeholder="Type your answer..."
//                   value={userAnswers[index] || ""}
//                   onChange={(e) => handleAnswerChange(index, e.target.value)}
//                   className="answer-input"
//                 />
//               )}

//               {/* Coding questions */}
//               {q.questionType === "coding" && (
//                 <textarea
//                   placeholder="Write your code here..."
//                   rows={5}
//                   className="coding-input"
//                 />
//               )}
//             </div>

//             <button className="add-button" onClick={() => handleAddQuestion(q)}>
//               Add
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Selected Questions */}
//       <div className="question-list">
//         <h3>Selected Questions</h3>
//         {selectedQuizQuestions.length === 0 ? (
//           <p className="selection-info">No questions selected yet.</p>
//         ) : (
//           selectedQuizQuestions.map((q, index) => (
//             <div key={index} className="question-item">
//               <p>{q.question}</p>
//               <button
//                 className="add-button remove"
//                 onClick={() => handleRemoveQuestion(q)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="button-group">
//         <button className="back-button" onClick={handleBack}>
//           Back
//         </button>
//         <button
//           className="save-button"
//           onClick={handleSave}
//           disabled={selectedQuizQuestions.length === 0}
//         >
//           Save Quiz
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionSelectionPage;
import React, { useState } from "react";
import axios from "axios";
import "./QuestionSelectionPage.css";

const QuestionSelectionPage = ({
  filteredQuestions,
  selectedQuizQuestions,
  handleAddQuestion,
  handleRemoveQuestion,
  handleBack,
}) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAnswerChange = (index, value) => {
    setUserAnswers({ ...userAnswers, [index]: value });
  };
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSave = async () => {
    if (selectedQuizQuestions.length === 0) return;

    try {
      setIsSaving(true);

      // Prepare payload
      const payload = {
        questions: selectedQuizQuestions.map((q, idx) => ({
          questionType: q.questionType === "quiz" ? "mcq" : q.questionType,
          questionTopic: q.topic, // optional: topic field
          questionLevel: q.level, // optional: level
          question: q.question,
          options: q.options || [],
          answer: userAnswers[idx] || q.answer || "", // user's input or default
        })),
      };
      console.log(payload);

      // API call
      const res = await axios.post(
        `${API_URL}/api/question/addQuestions`,
        payload
      );

      if (res.status === 200 || res.status === 201) {
        alert("Questions saved successfully!");
        // Optionally, reset selected questions
      } else {
        alert("Failed to save questions!");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving questions!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Select Questions</h2>
      <p className="selection-info">
        Choose from the filtered questions and add them to your quiz.
      </p>

      {/* Questions List */}
      <div className="question-list">
        {filteredQuestions.map((q, index) => (
          <div key={index} className="question-item">
            <div className="question-content">
              <p>
                <b>Q{index + 1}:</b> {q.question}
              </p>

              {q.questionType === "quiz" && (
                <div className="options">
                  {q.options?.map((opt, i) => (
                    <label key={i} className="option-label">
                      <input
                        type="radio"
                        name={`q-${index}`}
                        value={opt}
                        onChange={() => handleAnswerChange(index, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {q.questionType === "one-line" && (
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={userAnswers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="answer-input"
                />
              )}

              {q.questionType === "coding" && (
                <textarea
                  placeholder="Write your code here..."
                  rows={5}
                  className="coding-input"
                  value={userAnswers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              )}
            </div>

            <button className="add-button" onClick={() => handleAddQuestion(q)}>
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Selected Questions */}
      <div className="question-list">
        <h3>Selected Questions</h3>
        {selectedQuizQuestions.length === 0 ? (
          <p className="selection-info">No questions selected yet.</p>
        ) : (
          selectedQuizQuestions.map((q, index) => (
            <div key={index} className="question-item">
              <p>{q.question}</p>
              <button
                className="add-button remove"
                onClick={() => handleRemoveQuestion(q)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button
          className="save-button"
          onClick={handleSave}
          disabled={selectedQuizQuestions.length === 0 || isSaving}
        >
          {isSaving ? "Saving..." : "Save Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuestionSelectionPage;
