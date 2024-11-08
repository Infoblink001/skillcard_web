import React, { useState,useEffect } from 'react'
import { Link, useParams,useNavigate } from "react-router-dom";


function Carousel({topics}) {
  const { topicId, subtopicId, coreTopicId } = useParams();
  const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));
  const selectedSubtopic = selectedTopic.subtopics.find(sub => sub.id === parseInt(subtopicId));
  const selectedCoreTopic = selectedSubtopic.coreTopics.find(core => core.id === parseInt(coreTopicId));
  const flashcards = selectedCoreTopic.flashcards;
  const navigate = useNavigate();
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const totalSlides = flashcards?.length || 0; // Use optional chaining and a fallback

  // Move to the next slide after a delay
  useEffect(() => {
    if (totalSlides === 0) return; // Exit early if there are no slides   


    // const timer = setTimeout(() => {
    //   handleNext();
    // }, 5000); // Automatically move to the next slide every 5 seconds
    // return () => clearTimeout(timer);
  }, [currentSlide, totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (totalSlides === 0) {
    return <div className="carousel-container">No flashcards available.</div>;
  }
 
  
  // Navigate to quiz
  const startQuiz = () => {
    let emArr = []
    flashcards.find(
      (e,i)=>e.options && e.options.length > 1? 
      emArr.push(e):
      null
      )
    
    if(emArr.length>0){
      navigate(`/flashcards/${topicId}/${subtopicId}/${coreTopicId}`);
    }else{
      alert('Quiz not yet available')
    }
  };

  // Set error for a specific flashcard ID when image fails
  const handleImageError = (flashcardId) => {
    setImageError((prevErrors) => ({ ...prevErrors, [flashcardId]: true }));
  };


  const openModal = () => {
    // setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setModalImageSrc("");
  };

  return (
    <>
    <main>
      <div className="carousel-container">
        <div className="carousel">
          {flashcards.map((flashcard, index) => (
            <div
              key={flashcard.id}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            >
              <h2>{flashcard.heading}</h2>
              {imageError[flashcard.id] ? (
              <div className="image-fallback">Image not found</div>
            ) : (
               
              <img
                className="carousel-image"
                src={flashcard.image}
                alt={flashcard.heading}
                onClick={openModal}
                onError={() => handleImageError(flashcard.id)} // Set error if image fails
              />
            )}
               
              <p>{flashcard.content}</p>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="carousel-indicators">
          {flashcards.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="carousel-button prev" onClick={handlePrev} disabled={currentSlide === 0}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="carousel-button next" onClick={handleNext} disabled={currentSlide === totalSlides - 1}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div className='quiz-box'>
        <button className='btn' onClick={startQuiz} >Take Quiz</button>
      </div>
    </main>

    {/* Modal for Full Image */}
    {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <img
              src={flashcards[currentSlide]?.image} // Use currentSlide to set the image src
              alt="Full-size view"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Carousel