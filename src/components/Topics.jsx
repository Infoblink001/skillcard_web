import React from 'react'
import { Link } from 'react-router-dom'

function Topics({topics}) {
     
  return (
    <>


      <main>
        <h1 className='stack-title'>Topics</h1>
        <div className="info-cards">
          {topics.map(topic => (
            <Link key={topic.id} className='card' to={`/topic/${topic.id}`}>{topic.name}</Link>
          ))}
        </div>
      </main>
         
        
    </>
  )
}

export default Topics