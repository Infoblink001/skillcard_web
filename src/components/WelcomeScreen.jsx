import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import data from '../assets/data.json'

const WelcomeScreen = () => {
  const [arr, setarr] = useState([])

  useEffect(() => {
    setarr(data)
  
    return  
  }, [data])


  const handleClick=(arg)=>{
    console.log(arg.sub_topics)
  }
  

  return (
    <div>
      <div className="app-title-wrapper">                
        <h1 className="app-title">InfoBlink</h1>
        <p className="app-tagline">Instant Insight, Every Time</p>
      </div>
      <div className='exp-div'>
        <h3>Explore topics and get instant insights</h3>
        <div className="exp-btns">
          {arr.map((element,i)=>(
            <button key={i} className='btn' onClick={(e)=>handleClick(element)} >{element?.topic}</button>
          ))}
        </div>
      </div>   

    </div>
  );
};

export default WelcomeScreen;
