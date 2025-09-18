import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuestionPaperDetailsPage.css";

const QuestionPaperDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const [allQuestions, setAllQuestions] = useState([]);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [adding, setAdding] = useState(false);

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    options: [],
    answer: "",
    questionType: "",
    questionTopic: "",
    questionLevel: "",
  });

  // Fetch paper details
  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/questionPaper/getAll`);
        if (response.data && response.data.papers) {
          const selectedPaper = response.data.papers.find(
            (p) => String(p.id) === String(id)
          );
          setPaper(selectedPaper || null);
        }
      } catch (error) {
        console.error("Error fetching paper:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  // Fetch all questions
  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/question/getAllQuestions`
      );
      if (response.data && response.data.questions) {
        const questionsNotInPaper = response.data.questions.filter(
          (q) => !paper.questions.some((pq) => pq.id === q.id)
        );
        setAllQuestions(questionsNotInPaper);
        setShowAllQuestions(true);
      }
    } catch (error) {
      console.error("Error fetching all questions:", error);
    }
  };

  // Handle checkbox toggle
  const handleSelectQuestion = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Add selected questions to paper
  const handleAddQuestions = async () => {
    if (selectedQuestions.length === 0)
      return alert("Select at least one question.");

    try {
      setAdding(true);
      const response = await axios.post(
        `${API_URL}/api/questionPaper/addQuestion`,
        {
          paperId: paper.id,
          questionIds: selectedQuestions,
        }
      );
      if (response.data.success) {
        alert(`${response.data.addedCount} questions added successfully!`);
        const updatedPaper = { ...paper };
        updatedPaper.questions.push(
          ...allQuestions.filter((q) => selectedQuestions.includes(q.id))
        );
        setPaper(updatedPaper);
        setSelectedQuestions([]);
        setShowAllQuestions(false);
      }
    } catch (error) {
      console.error("Error adding questions:", error);
      alert("Failed to add questions.");
    } finally {
      setAdding(false);
    }
  };

  // Open edit modal
  const openEditModal = (question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      options: question.options,
      answer: question.answer,
      questionType: question.questionType,
      questionTopic: question.questionTopic,
      questionLevel: question.questionLevel,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "options") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((opt) => opt.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit edited question
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/api/questionPaper/editQuestion`,
        {
          paperId: paper.id,
          questionId: editingQuestion.id,
          ...formData,
        }
      );
      if (response.data.success) {
        setPaper((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === editingQuestion.id ? { ...q, ...formData } : q
          ),
        }));
        setEditingQuestion(null);
        alert("Question updated successfully!");
      }
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question.");
    }
  };

  // Delete question handler
  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      const response = await axios.delete(
        `${API_URL}/api/questionPaper/deleteQuestion`,
        {
          data: {
            paperId: paper.id,
            questionId: questionId,
          },
        }
      );

      if (response.data.success) {
        setPaper((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q.id !== questionId),
        }));
        alert("Question deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question.");
    }
  };

  if (loading) {
    return (
      <div className="qpd-page">
        <div className="qpd-loader">Loading paper details...</div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="qpd-page">
        <div className="qpd-empty">
          <p>⚠️ Paper not found.</p>
          <button className="qpd-btn" onClick={() => navigate(-1)}>
            ⬅ Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qpd-page">
      <header className="qpd-header">
        <div>
          <h1>{paper.paperName}</h1>
          <p className="qpd-meta">
            ⏱ Duration: {paper.duration} mins | 📝 Questions:{" "}
            {paper.numOfQuestions}
          </p>
        </div>
        <button className="qpd-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </header>

      <button className="qpd-btn add-question-btn" onClick={fetchAllQuestions}>
        Add Questions
      </button>

      {showAllQuestions && (
        <section className="qpd-all-questions">
          <h2>Select Questions to Add</h2>
          <ul>
            {allQuestions.map((q) => (
              <li key={q.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => handleSelectQuestion(q.id)}
                  />{" "}
                  {q.question} ({q.questionTopic}, {q.questionLevel})
                </label>
              </li>
            ))}
          </ul>
          <button
            className="qpd-btn"
            onClick={handleAddQuestions}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add Selected Questions"}
          </button>
        </section>
      )}

      <section className="qpd-questions">
        {paper.questions.map((q, index) => (
          <div key={q.id} className="qpd-question-card">
            <h2>
              Q{index + 1}. {q.question}
            </h2>
            <p className="qpd-submeta">
              <span>📌 Type: {q.questionType}</span>
              <span>📚 Topic: {q.questionTopic}</span>
              <span>🎯 Level: {q.questionLevel}</span>
            </p>
            {q.options && (
              <ul className="qpd-options">
                {q.options.map((opt, i) => (
                  <li key={i} className={opt === q.answer ? "correct" : ""}>
                    {opt}
                  </li>
                ))}
              </ul>
            )}
            <p className="qpd-answer">
              ✅ <strong>Answer:</strong> {q.answer}
            </p>

            {/* Edit & Delete Buttons */}
            <div className="qpd-question-actions">
              <button
                className="qpd-btn edit-btn"
                onClick={() => openEditModal(q)}
              >
                ✏️ Edit
              </button>
              <button
                className="qpd-btn delete-btn"
                onClick={() => handleDeleteQuestion(q.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Edit Modal */}
      {editingQuestion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Question</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Question:
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Options (comma separated):
                <input
                  type="text"
                  name="options"
                  value={formData.options.join(", ")}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Answer:
                <input
                  type="text"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Question Type:
                <input
                  type="text"
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Topic:
                <input
                  type="text"
                  name="questionTopic"
                  value={formData.questionTopic}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Level:
                <input
                  type="text"
                  name="questionLevel"
                  value={formData.questionLevel}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="modal-buttons">
                <button type="submit" className="qpd-btn save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="qpd-btn cancel-btn"
                  onClick={() => setEditingQuestion(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPaperDetailsPage;
