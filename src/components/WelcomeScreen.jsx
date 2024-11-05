import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../assets/img/learning.png'


const WelcomeScreen = () => { 
  
  const location = useLocation()
  // console.log(location)

  return (
    <>
       <div className='welcome-wrap'>
          <div className='part-a'>
            <h1 className='app-title' >Welcome to the InfoBlink</h1>          
            <div className='gt'>
              <Link to='/auth' className='btn' >Get Started <i className="fa-solid fa-arrow-right"></i> </Link>
            </div>
          </div>
          <div className="part-b">
            <img src={img} alt="cover-art" className='cover-art' />
          </div>
            
          
       </div>
    </>
  );
};

export default WelcomeScreen;
