import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import data from '../assets/data.json'

const WelcomeScreen = () => { 
  
  const location = useLocation()
  // console.log(location)

  return (
    <>
       <div className='welcome-wrap'>
          <h1 className='app-title' >Welcome to the InfoBlink</h1>

          <div className="info-cards">
            <div className="card">
              <p>Learn</p>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
            <div className="card">
              <p>Play</p>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
            <div className="card">
              <p>Memorize</p>
            </div>
          </div>
          
          <div className='gt'>
            <Link to='/auth' className='btn' >Get Started <i className="fa-solid fa-arrow-right"></i> </Link>
          </div>
       </div>
    </>
  );
};

export default WelcomeScreen;
