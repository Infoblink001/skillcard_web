import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import  './App.css';
import Auth from './components/Auth';
import Topics from './components/Topics';
import data from './data/data.json'
import Subtopics from './components/Subtopics';
import Coretopics from './components/Coretopics';
import Carousel from './components/Carousel';
import Flahcard from './components/Flahcard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/topics" element={<Topics topics={data.topics}/>} />
        <Route path="/topic/:topicId" element={<Subtopics topics={data.topics} />} />
        <Route path="/topic/:topicId/subtopic/:subtopicId" element={<Coretopics topics={data.topics} />} />
        <Route path="/topic/:topicId/subtopic/:subtopicId/core/:coreTopicId" element={<Carousel topics={data.topics} />} />
        <Route path='/flashcards' element={<Flahcard/>} />
      </Routes>
    </Router>
  );
};

export default App;
