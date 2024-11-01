import React from 'react'
import { Link, useParams } from "react-router-dom";

function Coretopics({topics}) {
    const { topicId, subtopicId } = useParams();
    const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));
    const selectedSubtopic = selectedTopic.subtopics.find(sub => sub.id === parseInt(subtopicId));
  return (
    <>
        <div>
      <h3>{selectedSubtopic.name} - Core Topics</h3>
      <div className="info-cards">

            {selectedSubtopic.coreTopics.map(coreTopic => (
          <Link key={coreTopic.id} className='card' to={`/topic/${topicId}/subtopic/${subtopicId}/core/${coreTopic.id}`}>{coreTopic.name}</Link>
      ))}
      </div>
    </div>
    </>
  )
}

export default Coretopics