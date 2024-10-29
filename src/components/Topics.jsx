import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Topics({topics}) {
    const [username, setusername] = useState('')
    const n = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
      if(n){
        setusername(n)
      }else{
        navigate('/auth')
      }
     
    }, [username])


    const handlelogout =()=>{
        localStorage.removeItem('user')
    }
    
  return (
    <>
        <div className='nav'>
            <Link to={'/'} className='back-btn' onClick={handlelogout} > <i className="fa-solid fa-arrow-left"></i> Logout </Link>
            <p className='username'>{username}</p>
        </div>

        <div>
      <h1>Topics</h1>
      {topics.map(topic => (
        <div key={topic.id}>
          <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
        </div>
      ))}
    </div>
         
        
    </>
  )
}

export default Topics