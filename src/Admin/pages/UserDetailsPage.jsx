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

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/getUser/${uid}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details.");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [uid]);

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
  }, []);

  // Open confirmation modal on dropdown select
  const handlePaperSelect = (e) => {
    const paperId = e.target.value;
    setSelectedPaper(paperId);
    if (paperId) {
      setShowConfirmModal(true); // show modal when a paper is selected
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
      setShowConfirmModal(false); // hide modal after assignment
    }
  };

  return (
    <div className="user-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h1>User Details</h1>

      {loadingUser ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : user ? (
        <div className="user-details-card">
          <h2>{user.name}</h2>
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

          <div className="paper-dropdown">
            <label htmlFor="papers">Select Paper:</label>
            {loadingPapers ? (
              <p>Loading papers...</p>
            ) : (
              <select
                id="papers"
                value={selectedPaper}
                onChange={handlePaperSelect}
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
              style={{ marginLeft: "10px" }}
            >
              {assigning ? "Assigning..." : "Assign Paper"}
            </button>
          </div>

          {message && <p className="assign-message">{message}</p>}

          {showConfirmModal && selectedPaper && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <h3>Confirm Assignment</h3>
                <p>
                  Are you sure you want to assign this paper to{" "}
                  <strong>{user.name}</strong>?
                </p>
                {papers
                  .filter((paper) => paper.id === selectedPaper)
                  .map((paper) => (
                    <div key={paper.id}>
                      <p>
                        <strong>Paper Name:</strong> {paper.paperName}
                      </p>
                      <p>
                        <strong>Duration:</strong> {paper.duration} mins
                      </p>
                      <p>
                        <strong>Number of Questions:</strong>{" "}
                        {paper.numOfQuestions}
                      </p>
                    </div>
                  ))}
                <div className="modal-buttons">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button onClick={handleAssignPaper} className="confirm-btn">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetailsPage;
