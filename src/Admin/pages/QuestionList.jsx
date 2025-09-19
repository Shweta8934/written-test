// // QuestionListPage.jsx-> view previous question
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewOptionPage.css";

// const QuestionList = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterTopic, setFilterTopic] = useState("");
//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/question/getAllQuestions`
//         );
//         setQuestions(response.data.questions);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch questions.");
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const filteredQuestions = questions.filter((q) => {
//     return (
//       (filterType ? q.questionType === filterType : true) &&
//       (filterTopic ? q.questionTopic === filterTopic : true)
//     );
//   });

//   const uniqueTopics = [...new Set(questions.map((q) => q.questionTopic))];

//   if (loading) return <p>Loading questions...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="question-list-container">
//       <h1>All Questions</h1>

//       {/* Filters */}
//       <div className="filters">
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//         >
//           <option value="">All Types</option>
//           <option value="mcq">MCQ</option>
//           <option value="one-line">One-line</option>
//           <option value="coding">Coding</option>
//         </select>

//         <select
//           value={filterTopic}
//           onChange={(e) => setFilterTopic(e.target.value)}
//         >
//           <option value="">All Topics</option>
//           {uniqueTopics.map((topic) => (
//             <option key={topic} value={topic}>
//               {topic}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Question Cards */}
//       <div className="question-cards">
//         {filteredQuestions.map((q) => (
//           <div key={q.id} className="question-card">
//             <h3>Que:{q.question}</h3>
//             <p>
//               <strong>Type:</strong> {q.questionType} | <strong>Topic:</strong>{" "}
//               {q.questionTopic} | <strong>Level:</strong> {q.questionLevel}
//             </p>
//             {q.options.length > 0 && (
//               <ul>
//                 {q.options.map((opt, idx) => (
//                   <li key={idx}>{opt}</li>
//                 ))}
//               </ul>
//             )}
//             <p>
//               <strong>Answer:</strong> {q.answer}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewOptionPage.css";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/question/getAllQuestions`
        );
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [API_URL]);

  const filteredQuestions = questions.filter((q) => {
    return (
      (filterType ? q.questionType === filterType : true) &&
      (filterTopic ? q.questionTopic === filterTopic : true)
    );
  });

  const uniqueTopics = [...new Set(questions.map((q) => q.questionTopic))];

  if (loading) return <p className="status-message">Loading questions...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <div className="question-list-page">
      <header className="page-header">
        <h1 className="page-title">All Questions</h1>
      </header>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="type-filter" className="filter-label">
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="mcq">MCQ</option>
            <option value="one-line">One-line</option>
            <option value="coding">Coding</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="topic-filter" className="filter-label">
            Filter by Topic
          </label>
          <select
            id="topic-filter"
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
          >
            <option value="">All Topics</option>
            {uniqueTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <main className="question-cards-grid">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div key={q.id} className="question-card">
              <div className="card-header">
                <span className="question-type-badge">
                  {q.questionType.toUpperCase()}
                </span>
                <span className="question-topic-badge">{q.questionTopic}</span>
              </div>
              <h3 className="question-text">Que: {q.question}</h3>
              <div className="question-details">
                <p>
                  <strong>Level:</strong> {q.questionLevel}
                </p>
                {q.options.length > 0 && (
                  <ul className="question-options">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                )}
                <p className="question-answer">
                  <strong>Answer:</strong> {q.answer}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-questions-found">
            No questions found matching your criteria.
          </p>
        )}
      </main>
    </div>
  );
};

export default QuestionList;
