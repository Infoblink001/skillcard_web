import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
import Feedback from "./Feedback";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const jsConfetti = new JSConfetti()
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  useEffect(() => {
    if(score && score > 0){
      jsConfetti.addConfetti()
    }
  
     
  }, [score])
  

  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} out of {totalQuestions}</p>
      <button className="rs-btn" onClick={() => navigate("/")}>Back to Home</button>

      <div>
        <Feedback/>
      </div>


     
    </div>
  );
}

export default Result;
