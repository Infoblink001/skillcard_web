import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";


function Carousel({topics}) {
  const { topicId, subtopicId, coreTopicId } = useParams();
  const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));
  const selectedSubtopic = selectedTopic.subtopics.find(sub => sub.id === parseInt(subtopicId));
  const selectedCoreTopic = selectedSubtopic.coreTopics.find(core => core.id === parseInt(coreTopicId));
  const flashcards = selectedCoreTopic.flashcards;

  const [activeIndex, setActiveIndex] = useState(0);

  // Go to next flashcard
  const nextFlashcard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  // Go to previous flashcard
  const prevFlashcard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

   

  return (
    <div>
  <div className="carousel">
      <div className="carousel-content">
        {flashcards.map((flashcard, index) => (
          <div
            key={flashcard.id}
            className={`carousel-slide ${index === activeIndex ? "active" : ""}`}
            style={{ display: index === activeIndex ? "block" : "none" }}
          >
            <h4>{flashcard.heading}</h4>
            <img src={flashcard.image} alt={flashcard.heading} />
            <p>{flashcard.content}</p>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        {activeIndex > 0 && (
          <button className='prev-btn' onClick={prevFlashcard}>Previous</button>
        )}
        {activeIndex < flashcards.length - 1 && (
          <button className='next-btn' onClick={nextFlashcard}>Next</button>
        )}
        {activeIndex == flashcards.length-1 &&(
          <Link className='q-btn' to={'/flashcards'}>Take Quiz</Link>
        )}
      </div>
    </div>
    </div>
  )
}

export default Carousel