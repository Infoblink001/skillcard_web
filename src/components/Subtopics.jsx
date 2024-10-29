import React from 'react'
import { Link, useParams } from "react-router-dom";


function Subtopics({topics}) {

    const { topicId } = useParams();
    const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));

  return (
    <>
        <div>
      <h2>{selectedTopic.name} - Subtopics</h2>
      {selectedTopic.subtopics.map(subtopic => (
        <div key={subtopic.id}>
          <Link to={`/topic/${topicId}/subtopic/${subtopic.id}`}>{subtopic.name}</Link>
        </div>
      ))}
    </div>
    </>
  )
}

export default Subtopics