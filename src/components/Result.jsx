import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} out of {totalQuestions}</p>
      <button onClick={() => navigate("/")}>Back to Home</button>

      <style jsx>{`
        .result {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }

        button {
          padding: 10px 20px;
          margin-top: 20px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Result;
