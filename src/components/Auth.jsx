import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function Auth() {

    const [name, setname] = useState('')
    const [message, setmessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(name.length > 0){
            localStorage.setItem("user",name)
            navigate('/topics')
        } else{
            alert('Please enter your name')
        }
    }

    useEffect(() => {
        localStorage.removeItem("user")       
        if (location){
            setmessage(location.state)
        }
    }, [])
    


  return (
    <>
        <Link to={'/'} className='back-btn'> <i className="fa-solid fa-arrow-left"></i> Back</Link>
        {message &&  <p style={{color:'red',textAlign:'center'}}>{message}</p>}


        <form action="" className='auth-form' onSubmit={handleSubmit}>
            <label htmlFor="">Name</label><br />
            <input type="text" maxLength={10} value={name} onChange={(e)=>setname(e.target.value)} className='input' /><br />
            <button type="submit" className='btn'>Start</button>
        </form>
    </>
  )
}

export default Auth