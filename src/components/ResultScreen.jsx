import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultScreen = () => {
  const name = localStorage.getItem('name');
  const score = localStorage.getItem('score');
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Game Over, {name}!</h1>
      <h2>Your final score: {score}</h2>
      <p>Great job! Here's a message based on your performance.</p>

      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default ResultScreen;
