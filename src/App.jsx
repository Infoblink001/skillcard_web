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
import Result from './components/Result';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/topics" element={<Topics topics={data.topics}/>} />
        <Route path="/topic/:topicId" element={<Subtopics topics={data.topics} />} />
        <Route path="/topic/:topicId/subtopic/:subtopicId" element={<Coretopics topics={data.topics} />} />
        <Route path="/topic/:topicId/subtopic/:subtopicId/core/:coreTopicId" element={<Carousel topics={data.topics} />} />
        <Route path='/flashcards/:topicId/:subtopicId/:coreTopicId' element={<Flahcard topics={data.topics} />} />
        <Route path='/result' element={<Result/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
