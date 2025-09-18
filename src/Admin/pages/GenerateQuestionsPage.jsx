// import React, { useState } from "react";
// import "./GenerateQuestionPage.css";
// import allQuestions from "../../questionsData";
// import QuestionSelectionPage from "./QuestionSelectionPage";

// const GenerateQuestionPage = () => {
//   const [step, setStep] = useState(1);
//   const [quizDetails, setQuizDetails] = useState({
//     topic: "",
//     duration: "",
//     subject: "",
//     level: "",
//     questionType: "",
//   });
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [selectedQuizQuestions, setSelectedQuizQuestions] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setQuizDetails({ ...quizDetails, [name]: value });
//   };

//   const handleNext = () => {
//     const { topic, subject, level, questionType } = quizDetails;
//     if (topic && subject && level && questionType) {
//       // Filter questions based on user's input, and take only the first 4
//       const filtered = allQuestions
//         .filter(
//           (q) =>
//             q.topic.toLowerCase() === topic.toLowerCase() &&
//             q.level === level &&
//             q.questionType === questionType
//         )
//         .slice(0, 4); // Use .slice(0, 4) to get only the first 4 questions

//       if (filtered.length > 0) {
//         setFilteredQuestions(filtered);
//         setStep(2);
//       } else {
//         alert(
//           "No questions found for the selected criteria. Please try different options."
//         );
//       }
//     } else {
//       alert("Please fill in all the details before proceeding.");
//     }
//   };

//   const handleAddQuestion = (question) => {
//     if (!selectedQuizQuestions.some((q) => q.question === question.question)) {
//       setSelectedQuizQuestions([...selectedQuizQuestions, question]);
//     }
//   };

//   const handleRemoveQuestion = (questionToRemove) => {
//     const updatedQuestions = selectedQuizQuestions.filter(
//       (q) => q.question !== questionToRemove.question
//     );
//     setSelectedQuizQuestions(updatedQuestions);
//   };

//   const handleSave = () => {
//     console.log("Quiz saved!", { quizDetails, selectedQuizQuestions });
//     alert(
//       `Quiz with ${selectedQuizQuestions.length} questions saved successfully!`
//     );
//     handleReset();
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   const handleReset = () => {
//     setStep(1);
//     setQuizDetails({
//       topic: "",
//       duration: "",
//       subject: "",
//       level: "",
//       questionType: "",
//     });
//     setFilteredQuestions([]);
//     setSelectedQuizQuestions([]);
//   };

//   return (
//     <div className="generate-question-page">
//       {step === 1 ? (
//         <div className="form-container">
//           <h2>Quiz Details</h2>
//           {/* <input
//             type="text"
//             name="topic"
//             placeholder="Topic (e.g., React)"
//             value={quizDetails.topic}
//             onChange={handleChange}
//           /> */}
//           <select
//             name="topic"
//             value={quizDetails.topic}
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               Select Topic
//             </option>
//             <option value="JavaScript">JavaScript</option>
//             <option value="Python">Python</option>
//             <option value="Data Structure">Data Structure</option>
//             <option value="API Fundamentals">API Fundamentals</option>
//             <option value="Java">Java</option>
//             <option value="ReactJS">ReactJS</option>
//             <option value="SQL">SQL</option>
//             <option value="MongoDB">MongoDB</option>
//           </select>

//           <input
//             type="number"
//             name="duration"
//             placeholder="Duration (in minutes)"
//             value={quizDetails.duration}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject (e.g., Computer Science)"
//             value={quizDetails.subject}
//             onChange={handleChange}
//           />
//           <select
//             name="level"
//             value={quizDetails.level}
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               Select Level
//             </option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>
//           <select
//             name="questionType"
//             value={quizDetails.questionType}
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               Select Question Type
//             </option>
//             <option value="quiz">Quiz</option>
//             <option value="one-line">One Line</option>
//             <option value="coding">Coding</option>
//           </select>
//           <button className="next-button" onClick={handleNext}>
//             Next
//           </button>
//         </div>
//       ) : (
//         <QuestionSelectionPage
//           filteredQuestions={filteredQuestions}
//           selectedQuizQuestions={selectedQuizQuestions}
//           handleAddQuestion={handleAddQuestion}
//           handleRemoveQuestion={handleRemoveQuestion}
//           handleBack={handleBack}
//           handleSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };

// export default GenerateQuestionPage;
import React, { useState } from "react";
import axios from "axios";
import "./GenerateQuestionPage.css";
import QuestionSelectionPage from "./QuestionSelectionPage";

const GenerateQuestionPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // loader state
  const API_URL = process.env.REACT_APP_API_URL;

  const [quizDetails, setQuizDetails] = useState({
    topic: "",
    duration: "",
    subject: "",
    level: "",
    questionType: "",
  });
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuizQuestions, setSelectedQuizQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
  };

  const handleNext = async () => {
    const { topic, level, questionType } = quizDetails;
    if (!topic || !level || !questionType) {
      return alert("Please fill in all the details before proceeding.");
    }

    try {
      setLoading(true); // show loader
      // Map questionType to API value
      const typeMapping = {
        quiz: "mcq",
        "one-line": "one line answer",
        coding: "coding question",
      };

      const payload = {
        questionType: typeMapping[questionType],
        questionTopic: topic,
        questionLevel: level,
      };

      const response = await axios.post(
        `${API_URL}/api/quiz/generate`,
        payload
      );

      if (response.data.success && response.data.quiz.length > 0) {
        // normalize questions to include questionType, topic, and level
        const normalizedQuestions = response.data.quiz.map((q) => ({
          ...q,
          questionType,
          topic: quizDetails.topic, // add topic
          level: quizDetails.level, // add level
        }));
        setFilteredQuestions(normalizedQuestions);
        setStep(2);
      } else {
        alert("No questions found for the selected criteria.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = (question) => {
    if (!selectedQuizQuestions.some((q) => q.question === question.question)) {
      setSelectedQuizQuestions([...selectedQuizQuestions, question]);
    }
  };

  const handleRemoveQuestion = (questionToRemove) => {
    const updatedQuestions = selectedQuizQuestions.filter(
      (q) => q.question !== questionToRemove.question
    );
    setSelectedQuizQuestions(updatedQuestions);
  };

  const handleSave = () => {
    console.log("Quiz saved!", { quizDetails, selectedQuizQuestions });
    alert(
      `Quiz with ${selectedQuizQuestions.length} questions saved successfully!`
    );
    handleReset();
  };

  const handleBack = () => setStep(1);

  const handleReset = () => {
    setStep(1);
    setQuizDetails({
      topic: "",
      duration: "",
      subject: "",
      level: "",
      questionType: "",
    });
    setFilteredQuestions([]);
    setSelectedQuizQuestions([]);
  };

  return (
    <div className="generate-question-page">
      {step === 1 ? (
        <div className="form-container">
          <h2>Quiz Details</h2>
          <select
            name="topic"
            value={quizDetails.topic}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Topic
            </option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Data Structure">Data Structure</option>
            <option value="API Fundamentals">API Fundamentals</option>
            <option value="Java">Java</option>
            <option value="ReactJS">ReactJS</option>
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>

          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes)"
            value={quizDetails.duration}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject (e.g., Computer Science)"
            value={quizDetails.subject}
            onChange={handleChange}
          />
          <select
            name="level"
            value={quizDetails.level}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Level
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="questionType"
            value={quizDetails.questionType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Question Type
            </option>
            <option value="quiz">MCQ</option>
            <option value="one-line">One Line</option>
            <option value="coding">Coding</option>
          </select>

          <button
            className="next-button"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Generating Questions..." : "Next"}
          </button>
        </div>
      ) : (
        <QuestionSelectionPage
          filteredQuestions={filteredQuestions}
          selectedQuizQuestions={selectedQuizQuestions}
          handleAddQuestion={handleAddQuestion}
          handleRemoveQuestion={handleRemoveQuestion}
          handleBack={handleBack}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default GenerateQuestionPage;
