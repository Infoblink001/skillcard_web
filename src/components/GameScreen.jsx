import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Flashcard from './Flashcard';
import useSound from 'use-sound';
import flipSound from '../sounds/flip_sound.mp3';
import correctSound from '../sounds/notification.mp3';
import wrongSound from '../sounds/wrong_answer.mp3';
import timeoutSound from '../sounds/success.mp3';

 

const GameScreen = () => {
  const easyFlashcards = [
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What color is the sky?', answer: 'Blue' },
  ];
  const mediumFlashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript.' },
  ];
  const hardFlashcards = [
    { question: 'Explain closures in JavaScript.', answer: 'A closure is a function that remembers its scope.' },
    { question: 'What is the virtual DOM?', answer: 'A virtual representation of the real DOM.' },
  ];

  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  const [playFlip] = useSound(flipSound);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playTimeout] = useSound(timeoutSound);

  // Fetch user inputs from localStorage
  const name = localStorage.getItem('name');
  const topic = localStorage.getItem('topic');
  const difficulty = localStorage.getItem('difficulty');

  // Start the game and set flashcards based on difficulty
  useEffect(() => {
    if (difficulty === 'easy') setFlashcards(easyFlashcards);
    if (difficulty === 'medium') setFlashcards(mediumFlashcards);
    if (difficulty === 'hard') setFlashcards(hardFlashcards);
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      playTimeout();
      handleWrongAnswer();
    }
  }, [timeLeft]);

  // UseEffect to navigate after score is updated
  useEffect(() => {
    if (gameFinished) {
      localStorage.setItem('score', score);
      navigate('/result');
    }
  }, [score, gameFinished, navigate]);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
      setTimeLeft(difficulty === 'easy' ? 15 : difficulty === 'hard' ? 5 : 10);
    } else {
      // Set gameFinished state to true and trigger score update
      setGameFinished(true);
    }
  };

  const handleShowAnswer = () => {
    playFlip();
    setShowAnswer(true);
  };

  const handleCorrectAnswer = () => {
    playCorrect();
    setScore(prevScore => prevScore + 1); // Update score before next card
    handleNextCard();
  };

  const handleWrongAnswer = () => {
    playWrong();
    handleNextCard();
  };

  if (isGameOver) {
    return <h1>Game Over!</h1>;
  }

  // Prevents accessing undefined flashcards before they are loaded
  if (flashcards.length === 0 || !flashcards[currentCardIndex]) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div>
      <h1>{name}, Welcome to the {topic} Flashcard Game!</h1>
      <h2>Difficulty: {difficulty}</h2>
      <h3>Score: {score}</h3>
      <p>Card {currentCardIndex + 1} of {flashcards.length}</p>

      <Flashcard
        question={flashcards[currentCardIndex].question}
        answer={showAnswer ? flashcards[currentCardIndex].answer : 'Click to see the next card'}
        onClick={handleShowAnswer}
      />

      {showAnswer && (
        <div className='ctrl'>
          <button onClick={handleCorrectAnswer}>Correct</button>
          <button onClick={handleWrongAnswer}>Wrong</button>
        </div>
      )}

      <p>Time Left: {timeLeft} seconds</p>
    </div>
  );
};

export default GameScreen;
