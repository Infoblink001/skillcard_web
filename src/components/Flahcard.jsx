import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Flashcard({ topics }) {
  const { topicId, subtopicId, coreTopicId } = useParams();
  const navigate = useNavigate();

  const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));
  const selectedSubtopic = selectedTopic.subtopics.find(sub => sub.id === parseInt(subtopicId));
  const selectedCoreTopic = selectedSubtopic.coreTopics.find(core => core.id === parseInt(coreTopicId));
  const flashcards = selectedCoreTopic.flashcards;

  const [currentCard, setCurrentCard] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalQuestions = flashcards.length;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError(""); // Clear any previous error
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      setError("Please select an option before submitting.");
      return;
    }
    setShowAnswer(true);
    const correctAnswer = flashcards[currentCard].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setError(""); // Clear error for the next question

    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        navigate("/result", {
          state: { score: score, totalQuestions: flashcards.length }
        });
      }, 2000); // Simulate a loading screen delay of 2 seconds
    }
  };

  return (
    <>
      <main>
        <div className="quiz">
          <h2>{flashcards[currentCard].heading}</h2>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${((currentCard + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
          <p>
            Question {currentCard + 1} of {totalQuestions}
          </p>

          {loading ? (
            <div className="loading-screen">
              <p>Loading Results...</p>
            </div>
          ) : (
            <div className={`flashcard-container ${showAnswer ? "show-answer" : ""}`}>
              {/* Front Side - Question and Options */}
              <div className="flashcard-side flashcard-front">
                {flashcards[currentCard].options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                    />
                    {option}
                  </label>
                ))}
                <button className="flashcard-btn" onClick={handleSubmit}>Submit</button>
                {error && <p className="error-message">{error}</p>}
              </div>

              {/* Back Side - Answer */}
              <div className="flashcard-side flashcard-back">
                <p>Correct Answer: {flashcards[currentCard].correctAnswer}</p>
                <button className="flashcard-btn" onClick={nextQuestion}>
                  {currentCard < flashcards.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              </div>
            </div>
          )}

          
        </div>
      </main>
    </>
  );
}

export default Flashcard;
