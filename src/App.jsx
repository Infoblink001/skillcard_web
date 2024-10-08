import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';

const App = () => {
  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript.' },
    { question: 'What is useState?', answer: 'A hook for managing state in functional components.' },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Timer state

  useEffect(() => {
    if (timeLeft > 0 && showAnswer) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      handleWrongAnswer(); // Auto-move to the next card if time runs out
    }
  }, [timeLeft, showAnswer]);

  const handleNextCard = () => {
    setCurrentCardIndex(currentCardIndex + 1);
    setShowAnswer(false);
    setTimeLeft(10); // Reset timer for the next card
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    handleNextCard();
  };

  const handleWrongAnswer = () => {
    handleNextCard();
  };

  const progress = ((currentCardIndex ) / flashcards.length) * 100;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Flashcard Game</h1>
      <h2>Score: {score}</h2>
      <p>Card {currentCardIndex + 1} of {flashcards.length}</p>

      {/* Progress Bar */}
      <div style={{ width: '10%', height: '10px', backgroundColor: '#e0e0e0', marginBottom: '1rem' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#007bff',
          }}
        />
      </div>

      {/* Timer */}
      {showAnswer && <h3>Time Left: {timeLeft} seconds</h3>}

      {currentCardIndex < flashcards.length ? (
        <>
          <Flashcard
            question={flashcards[currentCardIndex].question}
            answer={showAnswer ? flashcards[currentCardIndex].answer : 'Click to see the answer'}
            onClick={handleShowAnswer}
          />
          
          {showAnswer && (
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleCorrectAnswer} style={{ marginRight: '1rem' }}>Correct</button>
              <button onClick={handleWrongAnswer}>Wrong</button>
            </div>
          )}
        </>
      ) : (
        <h2>Game Over! Your final score is {score}.</h2>
      )}
    </div>
  );
};

export default App;
