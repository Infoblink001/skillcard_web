import React, { useState,useEffect } from 'react'
import { send,init } from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

init(process.env.REACT_APP_EMAILJS_USER_ID)


function Feedback() {
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(0); 
    const [comment, setComment] = useState('');
    const [username,setUsername] = useState('');
    const user = localStorage.getItem("user")
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setUsername(user)
        }
       
    }, [user])
    


    const handleStarClick = (ratingValue) => { 
        setRating(ratingValue); 
    }; 
    
    const handleStarMouseOver = (ratingValue) => {
        setHover(ratingValue); 
    }; 
    const handleStarMouseOut = () => { 
        setHover(0); 
    }; 
    
    const handleSubmit = (event) => { 
        event.preventDefault(); // Handle form submission, e.g., send data to server 
        console.log(`Rating: ${rating}, Comment: ${comment}`);
        const templateParams = { 
            username:username,
            rating: rating, 
            comment: comment, 
        };
        send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, templateParams) 
        .then((response) => { 
            console.log('SUCCESS!'); 
            navigate('/')

        }) 
        .catch((error) => { console.log('FAILED...'); });
    }

  return (
    <>
        <div className='feedback'>
            <h4>Please share your feedback</h4>             
              <form onSubmit={handleSubmit}>
                  <div className="star-rating">
                      {[...Array(5)].map((star, index) => {
                          const ratingValue = index + 1;
                          return (
                              <label key={index}>
                                  <input
                                      type="radio"
                                      name="rating"
                                      value={ratingValue}
                                      onClick={() => handleStarClick(ratingValue)}
                                  />
                                  <span
                                      className="star"
                                      style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9", }}
                                      onMouseOver={() => handleStarMouseOver(ratingValue)} onMouseOut={handleStarMouseOut}
                                  > &#9733;
                                  </span>
                              </label>);
                      })}
                  </div>
                  <div className="comment-section">
                      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave your feedback" />
                  </div>
                  <button type="submit">Submit</button>
              </form>

        </div>
    </>
  )
}

export default Feedback