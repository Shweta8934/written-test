// QuestionListPage.jsx
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
  }, []);

  const filteredQuestions = questions.filter((q) => {
    return (
      (filterType ? q.questionType === filterType : true) &&
      (filterTopic ? q.questionTopic === filterTopic : true)
    );
  });

  const uniqueTopics = [...new Set(questions.map((q) => q.questionTopic))];

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="question-list-container">
      <h1>All Questions</h1>

      {/* Filters */}
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="mcq">MCQ</option>
          <option value="one-line">One-line</option>
          <option value="coding">Coding</option>
        </select>

        <select
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

      {/* Question Cards */}
      <div className="question-cards">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="question-card">
            <h3>Que:{q.question}</h3>
            <p>
              <strong>Type:</strong> {q.questionType} | <strong>Topic:</strong>{" "}
              {q.questionTopic} | <strong>Level:</strong> {q.questionLevel}
            </p>
            {q.options.length > 0 && (
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            )}
            <p>
              <strong>Answer:</strong> {q.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
