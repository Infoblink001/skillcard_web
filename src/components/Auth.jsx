import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Auth() {

    const [name, setname] = useState('')
    const navigate = useNavigate()
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(name.length > 0){
            console.log(name)
            localStorage.setItem("user",name)
            navigate('/topics')
        } else{
            alert('Please enter your name')
        }
    }


  return (
    <>
        <Link to={'/'} className='back-btn'> <i className="fa-solid fa-arrow-left"></i> Back</Link>

        <form action="" className='auth-form' onSubmit={handleSubmit}>
            <label htmlFor="">Name</label><br />
            <input type="text" maxLength={10} value={name} onChange={(e)=>setname(e.target.value)} className='input' /><br />
            <button type="submit" className='btn'>Start</button>
        </form>
    </>
  )
}

export default Auth