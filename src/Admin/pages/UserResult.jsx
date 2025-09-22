import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserResult.css";

const UserResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/result/${resultId}`);
        if (response.data.success) {
          setResult(response.data);
        } else {
          setResult(null); // no result but not an error
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch result.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId, API_URL]);

  return (
    <div className="user-result-page">
      <div className="result-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <h1 className="page-title">Result Details</h1>
      </div>

      {loading ? (
        <p className="loading-text">Loading result...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : result ? (
        <div className="result-card">
          {result.questions && result.questions.length > 0 && (
            <div className="questions-section">
              <h3>Questions Overview</h3>
              <table className="questions-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.questions.map((q, idx) => (
                    <tr key={q.questionId}>
                      <td>{idx + 1}</td>
                      <td>{q.question}</td>
                      <td>{q.userAnswer || "—"}</td>
                      <td>{q.correctAnswer}</td>
                      <td>{q.isCorrect ? "✅ Correct" : "❌ Wrong"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserResult;
