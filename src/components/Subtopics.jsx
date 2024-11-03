import React from 'react'
import { Link, useParams } from "react-router-dom";


function Subtopics({topics}) {

    const { topicId } = useParams();
    const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));

  return (
    <>
      <div>
        <h2 className='stack-title' >{selectedTopic.name} - Subtopics</h2>
        <div className="info-cards">
          {selectedTopic.subtopics.map(subtopic => (
            <Link key={subtopic.id} className='card' to={`/topic/${topicId}/subtopic/${subtopic.id}`}>{subtopic.name}</Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Subtopics