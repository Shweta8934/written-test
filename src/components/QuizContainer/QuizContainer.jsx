import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import axios from "axios";
import QuestionCard from "../QuestionCard/QuestionCard";
import Navigation from "../Navigation/Navigation";
import Timer from "../Timer/Timer";
import "./QuizContainer.css";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice"; // path check karo

const QuizContainer = ({ userId }) => {
  const navigate = useNavigate(); // ✅ initialize navigation
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false); // modal open state
  const [submitPending, setSubmitPending] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paperId, setPaperId] = useState(""); // Dynamic paperId

  const API_URL = process.env.REACT_APP_API_URL;
  const totalQuestions = questions.length;

  // ✅ Track tab switch count
  const tabSwitchCount = useRef(0);

  // Prevent text selection
  useEffect(() => {
    const handleSelectStart = (e) => e.preventDefault();
    document.addEventListener("selectstart", handleSelectStart);

    return () => document.removeEventListener("selectstart", handleSelectStart);
  }, []);

  // Handle tab/window switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount.current += 1;
        if (tabSwitchCount.current > 3) {
          alert(
            "You switched tabs too many times! Quiz will be submitted automatically."
          );
          handleSubmit();
        } else {
          alert(`Warning! You switched tab ${tabSwitchCount.current} time(s).`);
        }
      }
    };

    const handleWindowBlur = () => {
      tabSwitchCount.current += 1;
      if (tabSwitchCount.current > 3) {
        alert(
          "You switched tabs too many times! Quiz will be submitted automatically."
        );
        handleSubmit();
      } else {
        alert(`Warning! You switched tab ${tabSwitchCount.current} time(s).`);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [questions, paperId]);

  useEffect(() => {
    const fetchUserPapersAndQuestions = async () => {
      try {
        const userRes = await axios.get(
          `${API_URL}/api/users/getUser/${userId}`
        );
        const userData = userRes.data;
        if (firstTest.isSubmitted) {
          alert("You have already submitted this quiz. Redirecting to home.");
          navigate("/"); // redirect to /
          return;
        }
        const paperObjs = userData?.tests || [];
        const paperIds = paperObjs.map((t) => t.testId);
        // ✅ Check if first test is already submitted
        const firstTest = paperObjs[0];

        if (paperIds.length === 0) {
          setLoading(false);
          return;
        }

        setPaperId(paperIds[0]);

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

  // const handleSubmit = async () => {
  //   try {
  //     if (!paperId) return;

  //     // ✅ Confirmation popup
  //     const confirmed = window.confirm(
  //       "Are you sure you want to submit the quiz?"
  //     );
  //     if (!confirmed) return; // Agar user cancel kare, submit nahi hoga

  //     const payload = {
  //       paperId,
  //       userId,
  //       responses: questions.map((q) => ({
  //         questionId: q.id,
  //         answer: q.selectedOption || "",
  //       })),
  //     };

  //     await axios.post(`${API_URL}/api/result/submit`, payload);

  //     // ✅ Logout user immediately
  //     dispatch(logout());
  //     navigate("/"); // Redirect to login page
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to submit quiz.");
  //   }
  // };
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

      // ✅ Logout user immediately
      dispatch(logout());
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  // ✅ Open modal instead of window.confirm
  const handleSubmitClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    handleSubmit();
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };
  if (loading) {
    return <div className="quiz-loading">Loading your question paper...</div>;
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
    <>
      <Header />

      <div className="quiz-container no-select">
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
          onSelect={(option) =>
            handleAnswerChange(currentQuestionIndex, option)
          }
        />
        <Navigation
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmitClick}
        />
        {showConfirmation && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Submit Quiz?</h2>
              <p>
                Are you sure you want to submit your quiz? This action cannot be
                undone.
              </p>
              <div className="modal-buttons">
                <button className="modal-btn yes" onClick={handleConfirmSubmit}>
                  Yes
                </button>
                <button className="modal-btn no" onClick={handleCancelSubmit}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizContainer;
