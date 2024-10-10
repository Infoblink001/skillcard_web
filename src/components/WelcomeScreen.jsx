import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    // Store user input in localStorage or context to pass between screens
    localStorage.setItem('name', name);
    localStorage.setItem('topic', topic);
    localStorage.setItem('difficulty', difficulty);
    
    // Redirect to game screen
    navigate('/game');
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  return (
    <div>
      <h1>Welcome to the Skill card Game!</h1>
      <h2 className='sub-heading'>Chose a topic that you are intrested In and start the game</h2>
      <div className='cards-demo'>Sample Image</div>
      <form action="" onSubmit={handleSubmit} className='setting-form'>
            
        <label>
            Name:
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            />
        </label>

        <label>
            Topic:
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Select Topic</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="programming">Programming</option>
            </select>
        </label>

        <label>
            Difficulty:
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            </select>
        </label>

        <button onClick={handleStartGame} disabled={!name || !topic || !difficulty}>
            Start Game
        </button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
