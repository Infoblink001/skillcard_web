import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import  './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
