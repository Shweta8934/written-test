import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import axios from "axios";
import QuestionCard from "../QuestionCard/QuestionCard";
import Navigation from "../Navigation/Navigation";
import Timer from "../Timer/Timer";
import "./QuizContainer.css";

const QuizContainer = ({ userId }) => {
  const navigate = useNavigate(); // ✅ initialize navigation

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paperId, setPaperId] = useState(""); // Dynamic paperId
  const [showConfirmation, setShowConfirmation] = useState(false); // ✅ modal state

  const API_URL = process.env.REACT_APP_API_URL;
  const totalQuestions = questions.length;

  useEffect(() => {
    const fetchUserPapersAndQuestions = async () => {
      try {
        const userRes = await axios.get(
          `{API_URL}/api/users/getUser/${userId}`
        );

        const paperObjs =
          userRes.data?.subcollections?.assignedPapers ||
          userRes.data?.assignedPapers ||
          [];
        const paperIds = paperObjs.map((p) => p.paperId);

        if (paperIds.length === 0) {
          setLoading(false);
          return;
        }

        setPaperId(paperIds[0]); // first paper

        const paperPromises = paperIds.map((pid) =>
          axios.get(`${API_URL}/api/questionPaper/getQuestion/${pid}`)
        );
        const paperResponses = await Promise.all(paperPromises);

        const allQuestions = paperResponses
          .map((res) => res.data?.questions || res.data?.data?.questions || [])
          .flat();

        const normalizedQuestions = allQuestions.map((q, idx) => ({
          id: q.id || idx + 1,
          question: q.question || q.questionText || "Untitled Question",
          questionType: q.questionType || q.type || "mcq",
          options: q.options || [],
          code: q.code || "",
          language: q.language || "JavaScript",
          answer: q.answer || "",
          selectedOption: q.selectedOption || null,
        }));

        setQuestions(normalizedQuestions);
      } catch (err) {
        console.error("Error fetching user papers/questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPapersAndQuestions();
  }, [userId]);

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (qIndex, answer) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qIndex ? { ...q, selectedOption: answer } : q
      )
    );
  };

  const handleSubmit = async () => {
    try {
      if (!paperId) return;

      const payload = {
        paperId,
        userId,
        responses: questions.map((q) => ({
          questionId: q.id,
          answer: q.selectedOption || "",
        })),
      };

      await axios.post(`${API_URL}/api/result/submit`, payload);

      // Show confirmation modal
      setShowConfirmation(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  if (loading) {
    return <div className="quiz-loading">Loading your quiz...</div>;
  }

  if (!loading && questions.length === 0) {
    return (
      <div className="quiz-no-questions">
        <img src="/averybit-new-full.png" alt="No questions" />
        <h2>No Quiz Assigned</h2>
        <p>
          You currently have no assigned quizzes. Please check back later or
          contact your administrator.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div
        className="quiz-top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "0 10px",
        }}
      >
        <div className="question-number">
          <h3>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h3>
        </div>
        <div className="timer">
          <Timer totalTime={3600} />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedOption={currentQuestion.selectedOption}
        onAnswerSubmit={(answer) =>
          handleAnswerChange(currentQuestionIndex, answer)
        }
        onSelect={(option) => handleAnswerChange(currentQuestionIndex, option)}
      />

      <Navigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
      />

      {/* ✅ Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Quiz Submitted Successfully!</h2>
            <p>Thank you for completing the quiz.</p>
            <button onClick={() => navigate("/")} className="modal-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
