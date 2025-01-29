import React from 'react'
import Topic from '../../components/Topic'
import { useRecoilValue } from 'recoil';
import { selectedTopicsAtom } from '../../state/topicsAtom';

const ExistingTopics = ({existingTopics, setSelectedTopics}) => {
    const selectedTopics = useRecoilValue(selectedTopicsAtom);
  
    const handleSelectedTopic = (topic) => {
      setSelectedTopics((prevTopics) =>
        prevTopics.includes(topic)
          ? prevTopics.filter((t) => t !== topic) // Deselect if already selected
          : [...prevTopics, topic] // Add topic if not selected
      );
    };
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
        <Topic
        key={index}
        disabled={false}
        selected={selectedTopics.includes(topic)} // Pass selected state
        onClick={() => handleSelectedTopic(topic)} // Handle selection
      >
        {topic}
        </Topic>
      ))}
    </div>
  </div>  )
}

export default ExistingTopics