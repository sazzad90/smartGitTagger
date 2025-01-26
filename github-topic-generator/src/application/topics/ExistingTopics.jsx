import React from 'react'
import Topic from '../../components/Topic'

const ExistingTopics = ({existingTopics}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        maxWidth: "100%",
        paddingTop: "5px",
        paddingBottom: "15px",
      }}
    >
      {existingTopics.map((topic, index) => (
        <Topic key={index} disabled={true}>
          {topic}
        </Topic>
      ))}
    </div>
  </div>  )
}

export default ExistingTopics