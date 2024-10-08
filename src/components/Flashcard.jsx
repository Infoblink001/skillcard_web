import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ question, answer, onClick }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    onClick(); // Call the onClick function passed from the parent
  };

  return (
    <div
      className="flashcard-container"
      style={{
        width: '300px',
        height: '200px',
        perspective: '1000px',
        margin: '0 auto',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={handleFlip}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          }}
        >
          <h3>{question}</h3>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#007bff',
            color: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          }}
        >
          <h3>{answer}</h3>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
