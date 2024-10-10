import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import useSound from 'use-sound';
import  './App.css';


import flipSound from './sounds/flip_sound.mp3';
import correctSound from './sounds/notification.mp3';
import wrongSound from './sounds/wrong_answer.mp3';
import timeoutSound from './sounds/success.mp3';

const App = () => {
  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript.' },
    { question: 'What is useState?', answer: 'A hook for managing state in functional components.' },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [difficulty, setDifficulty] = useState('medium'); // Difficulty state
  const [timeLeft, setTimeLeft] = useState(10); // Default time limit

  const [playFlip] = useSound(flipSound);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playTimeout] = useSound(timeoutSound);

  useEffect(() => {
    if (timeLeft > 0 && showAnswer) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      playTimeout();
      handleWrongAnswer();
    }
  }, [timeLeft, showAnswer]);

  const handleNextCard = () => {
    setCurrentCardIndex(currentCardIndex + 1);
    setShowAnswer(false);
    setTimeLeft(difficulty === 'easy' ? 15 : difficulty === 'hard' ? 5 : 10); // Adjust timer based on difficulty
  };

  const handleShowAnswer = () => {
    playFlip();
    setShowAnswer(true);
  };

  const handleCorrectAnswer = () => {
    playCorrect();
    setScore(score + 1);
    handleNextCard();
  };

  const handleWrongAnswer = () => {
    playWrong();
    handleNextCard();
  };

  const progress = ((currentCardIndex) / flashcards.length) * 100;

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Flashcard Game</h1>
      <h2>Score: {score}</h2>

      {/* Difficulty Selector */}
      <label>
        Difficulty:
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <p>Card {currentCardIndex} of {flashcards.length}</p>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', marginBottom: '1rem' }}>
        <div
          style={{
            width: `${progress
              }%`, height: '100%', backgroundColor: '#007bff',
          }} />
      </div>
      {/* Timer */}
      {showAnswer && <h3>Time Left: {timeLeft} seconds</h3>}

      {currentCardIndex < flashcards.length ? (
        <>
          <Flashcard
            question={flashcards[currentCardIndex].question}
            answer={showAnswer ? flashcards[currentCardIndex].answer : 'Click for the next question'}
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
); };

export default App;