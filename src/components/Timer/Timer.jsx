import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Timer = ({ totalTime }) => {
  const [time, setTime] = useState(totalTime);
  const navigate = useNavigate();

  useEffect(() => {
    if (time <= 0) {
      // Time's up → redirect to /login
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <div className="timer-box">{formatTime(time)}</div>
    </div>
  );
};

export default Timer;
