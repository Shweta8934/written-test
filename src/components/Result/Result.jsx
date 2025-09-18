// ResultPage.jsx
import { useLocation } from "react-router-dom";

// Example correct answers for demo
const correctAnswersDemo = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "A",
};

const ResultPage = () => {
  const location = useLocation();
  const { answers } = location.state || {};

  // Calculate score
  let score = 0;
  for (let key in correctAnswersDemo) {
    if (answers && answers[key] === correctAnswersDemo[key]) {
      score += 1;
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Quiz Result</h1>
      <h2>Demo User: John Doe</h2>
      <h3>
        Score: {score} / {Object.keys(correctAnswersDemo).length}
      </h3>

      <h3>Answers:</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Question No.</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(correctAnswersDemo).map((qIndex) => (
            <tr key={qIndex}>
              <td>{parseInt(qIndex) + 1}</td>
              <td>{answers?.[qIndex] || "Not answered"}</td>
              <td>{correctAnswersDemo[qIndex]}</td>
              <td>
                {answers?.[qIndex] === correctAnswersDemo[qIndex]
                  ? "✅ Correct"
                  : "❌ Wrong"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;
