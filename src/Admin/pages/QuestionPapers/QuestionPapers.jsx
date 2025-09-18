import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuestionPapers.css";

const QuestionPapersPage = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  // States for creating a new paper
  const [showForm, setShowForm] = useState(false);
  const [newPaper, setNewPaper] = useState({
    paperName: "",
    duration: "",
    numOfQuestions: "",
  });
  const [creating, setCreating] = useState(false);

  // States for editing
  const [editingPaperId, setEditingPaperId] = useState(null);
  const [editPaper, setEditPaper] = useState({
    paperName: "",
    duration: "",
    numOfQuestions: "",
  });
  const [updating, setUpdating] = useState(false);

  const fetchPapers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/questionPaper/getAll`);
      if (response.data && response.data.papers) {
        setPapers(response.data.papers);
      }
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/question-paper/${id}`);
  };

  const handleInputChange = (e, isEdit = false) => {
    if (isEdit) {
      setEditPaper({ ...editPaper, [e.target.name]: e.target.value });
    } else {
      setNewPaper({ ...newPaper, [e.target.name]: e.target.value });
    }
  };

  const handleCreatePaper = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await axios.post(`${API_URL}/api/questionPaper/create`, {
        paperName: newPaper.paperName,
        duration: Number(newPaper.duration),
        numOfQuestions: Number(newPaper.numOfQuestions),
      });
      if (response.data && response.data.paperId) {
        alert("Question paper created successfully!");
        setShowForm(false);
        setNewPaper({ paperName: "", duration: "", numOfQuestions: "" });
        fetchPapers(); // refresh list
      }
    } catch (error) {
      console.error("Error creating paper:", error);
      alert("Failed to create question paper.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeletePaper = async (paperId) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    try {
      const response = await axios.delete(
        `${API_URL}/api/questionPaper/delete`,
        { data: { paperId } }
      );

      if (response.data.success) {
        alert(response.data.message || "Question paper deleted successfully!");
        setPapers((prev) => prev.filter((paper) => paper.id !== paperId));
      } else {
        alert(response.data.message || "Failed to delete paper.");
      }
    } catch (error) {
      console.error("Error deleting paper:", error.response?.data || error);
      alert("Failed to delete paper.");
    }
  };

  // ✅ EDIT PAPER
  const handleEditClick = (paper) => {
    setEditingPaperId(paper.id);
    setEditPaper({
      paperName: paper.paperName,
      duration: paper.duration,
      numOfQuestions: paper.numOfQuestions,
    });
  };

  const handleCancelEdit = () => {
    setEditingPaperId(null);
    setEditPaper({ paperName: "", duration: "", numOfQuestions: "" });
  };

  const handleUpdatePaper = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await axios.put(`${API_URL}/api/questionPaper/edit`, {
        paperId: editingPaperId,
        paperName: editPaper.paperName,
        duration: Number(editPaper.duration),
        numOfQuestions: Number(editPaper.numOfQuestions),
      });

      if (response.data.success) {
        alert(response.data.message || "Question paper updated successfully!");
        fetchPapers(); // refresh list
        handleCancelEdit();
      }
    } catch (error) {
      console.error("Error updating paper:", error);
      alert("Failed to update question paper.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="qp-page">
        <div className="qp-container">
          <p>Loading question papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="qp-page">
      <div className="qp-container">
        <header className="qp-header">
          <h1 className="qp-title">Question Papers</h1>
          <button
            className="qp-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "New Question Paper"}
          </button>
        </header>

        {/* CREATE FORM */}
        {showForm && (
          <form className="qp-form" onSubmit={handleCreatePaper}>
            <div className="qp-form-row">
              <input
                type="text"
                name="paperName"
                placeholder="Paper Name"
                value={newPaper.paperName}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (mins)"
                value={newPaper.duration}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="numOfQuestions"
                placeholder="Total Questions"
                value={newPaper.numOfQuestions}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="qp-btn" disabled={creating}>
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
        )}

        {/* PAPERS LIST */}
        {papers.length === 0 ? (
          <p>No question papers available.</p>
        ) : (
          papers.map((paper) => (
            <article
              key={paper.id}
              className="qp-card"
              role="article"
              aria-labelledby={`paper-${paper.id}-title`}
            >
              <div className="qp-card-main">
                <div className="qp-card-left">
                  {editingPaperId === paper.id ? (
                    // ✅ EDIT FORM
                    <form className="qp-form" onSubmit={handleUpdatePaper}>
                      <div className="qp-form-row">
                        <input
                          type="text"
                          name="paperName"
                          value={editPaper.paperName}
                          onChange={(e) => handleInputChange(e, true)}
                          required
                        />
                        <input
                          type="number"
                          name="duration"
                          value={editPaper.duration}
                          onChange={(e) => handleInputChange(e, true)}
                          required
                        />
                        <input
                          type="number"
                          name="numOfQuestions"
                          value={editPaper.numOfQuestions}
                          onChange={(e) => handleInputChange(e, true)}
                          required
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="submit"
                          className="qp-btn"
                          disabled={updating}
                        >
                          {updating ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          className="qp-btn qp-delete-btn"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2
                        id={`paper-${paper.id}-title`}
                        className="qp-card-title"
                      >
                        {paper.paperName}
                      </h2>
                      <p className="qp-meta">
                        <span className="qp-meta-key">Duration:</span>
                        <span className="qp-meta-value">
                          {paper.duration} mins
                        </span>
                      </p>
                      <p className="qp-meta">
                        <span className="qp-meta-key">Total Questions:</span>
                        <span className="qp-meta-value">
                          {paper.numOfQuestions}
                        </span>
                      </p>
                    </>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                {editingPaperId !== paper.id && (
                  <div className="qp-card-right">
                    <button
                      className="qp-btn"
                      onClick={() => handleViewDetails(paper.id)}
                      aria-label={`View details for ${paper.paperName}`}
                    >
                      View Details
                    </button>

                    <button
                      className="qp-btn qp-delete-btn"
                      onClick={() => handleDeletePaper(paper.id)}
                      aria-label={`Delete ${paper.paperName}`}
                    >
                      Delete
                    </button>

                    <button
                      className="qp-btn qp-edit-btn"
                      onClick={() => handleEditClick(paper)}
                      aria-label={`Edit ${paper.paperName}`}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionPapersPage;
