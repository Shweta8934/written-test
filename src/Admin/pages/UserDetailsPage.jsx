import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetailsPage.css";

const UserDetailsPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [error, setError] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 🔹 Results state
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/getUser/${uid}`);
        setUser(response.data);

        if (response.data.tests && response.data.tests.length > 0) {
          const mappedResults = response.data.tests.map((t, idx) => ({
            id: `res-${idx}`,
            resultId: t.resultId,
            paperName: t.testName,
            score: t.score,
            totalMarks: t.total,
            attemptedOn: new Date(t.submittedOn).toLocaleString(),
          }));
          setResults(mappedResults);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details.");
      } finally {
        setLoadingUser(false);
        setLoadingResults(false);
      }
    };
    fetchUser();
  }, [uid, API_URL]);

  // Debug after state update
  useEffect(() => {
    console.log("Results state updated:", results);
  }, [results]);

  // Fetch all papers
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/questionPaper/getAll`);
        setPapers(response.data.papers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch papers.");
      } finally {
        setLoadingPapers(false);
      }
    };
    fetchPapers();
  }, [API_URL]);

  // Open confirmation modal on dropdown select
  const handlePaperSelect = (e) => {
    const paperId = e.target.value;
    setSelectedPaper(paperId);
    if (paperId) {
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
    }
  };

  // Assign paper to user
  const handleAssignPaper = async () => {
    setAssigning(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${API_URL}/api/questionPaper/assignPapers`,
        {
          userId: uid,
          paperIds: [selectedPaper],
        }
      );

      if (response.data.success) {
        setMessage(
          `Paper assigned successfully! Assigned count: ${response.data.assignedCount}`
        );
      } else {
        const skippedMsg = response.data.skipped
          .map((s) => `Paper ID: ${s.paperId}, Reason: ${s.reason}`)
          .join("\n");
        setMessage(`No new papers assigned.\n${skippedMsg}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to assign paper. Try again.");
    } finally {
      setAssigning(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="user-details-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <h1
          className="page-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          Details
        </h1>
      </div>

      {loadingUser ? (
        <p className="loading-text">Loading user details...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : user ? (
        <div className="main-content">
          <div className="user-info-card">
            <h2 className="user-name">{user.name}</h2>
            <div className="user-info-list">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt._seconds * 1000).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="assignment-section card">
            <h2>Assign a New Paper</h2>
            <div className="paper-assignment-controls">
              <label htmlFor="papers">Select Paper:</label>
              {loadingPapers ? (
                <p className="loading-text">Loading papers...</p>
              ) : (
                <select
                  id="papers"
                  value={selectedPaper}
                  onChange={handlePaperSelect}
                  className="paper-select"
                >
                  <option value="">-- Select Paper --</option>
                  {papers.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                      {paper.paperName}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={handleAssignPaper}
                disabled={!selectedPaper || !showConfirmModal || assigning}
                className="assign-btn"
              >
                {assigning ? "Assigning..." : "Assign Paper"}
              </button>
            </div>
            {message && <p className="assign-message">{message}</p>}
          </div>

          <div className="results-section card">
            <h2>Test Results</h2>
            {loadingResults ? (
              <p className="loading-text">Loading results...</p>
            ) : results.length > 0 ? (
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Paper</th>
                    <th>Score</th>
                    <th>Total Marks</th>
                    <th>Attempted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((res) => (
                    <tr key={res.id}>
                      <td>{res.paperName}</td>
                      <td>{res.score}</td>
                      <td>{res.totalMarks}</td>
                      <td>{res.attemptedOn}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => navigate(`/results/${res.resultId}`)}
                        >
                          View
                        </button>

                        {/* <button
                          className="view-btn"
                          onClick={() =>
                            navigate(`/user/${uid}/results/${res.id}`)
                          }
                        >
                          View
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-results-text">No test results found.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="not-found-text">User not found</p>
      )}

      {showConfirmModal && selectedPaper && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>Confirm Assignment</h3>
            <p>
              Are you sure you want to assign this paper to{" "}
              <strong>{user.name}</strong>?
            </p>
            {papers
              .filter((paper) => paper.id === selectedPaper)
              .map((paper) => (
                <div key={paper.id} className="paper-details-summary">
                  <p>
                    <strong>Paper Name:</strong> {paper.paperName}
                  </p>
                  <p>
                    <strong>Duration:</strong> {paper.duration} mins
                  </p>
                  <p>
                    <strong>Number of Questions:</strong> {paper.numOfQuestions}
                  </p>
                </div>
              ))}
            <div className="modal-buttons">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleAssignPaper} className="btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
