import React, { useState } from 'react'

function Feedback() {
    const [rate, setrate] = useState(0)

    const handleRating=(event)=>{
        setrate(event.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

  return (
    <>
        <div className='feedback'>
            <h4>Please share your feedback</h4>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Rating ({rate}/5) </label><br />
                <input type="range" min={0} max={5} step={1} value={rate}  onChange={handleRating}/><br />
                <label htmlFor="">Feedback</label><br />
                <textarea cols="30" rows="3"></textarea><br />
                <button type="submit">Submit</button>
            </form>

        </div>
    </>
  )
}

export default Feedback