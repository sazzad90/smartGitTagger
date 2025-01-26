import React from 'react'
import Topic from '../../components/Topic'
import { useRecoilValue } from 'recoil';
import { selectedTopicsAtom } from '../../state/topicsAtom';

const GeneratedTopics = ({generatedTopics, setSelectedTopics}) => {
  const selectedTopics = useRecoilValue(selectedTopicsAtom);
  
  const handleSelectedTopic = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic) // Deselect if already selected
        : [...prevTopics, topic] // Add topic if not selected
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        maxWidth: "100%",
        paddingTop: "5px",
      }}
    >
      {generatedTopics.map((topic, index) => (
                <Topic
                key={index}
                disabled={false}
                selected={selectedTopics.includes(topic)} // Pass selected state
                onClick={() => handleSelectedTopic(topic)} // Handle selection
              >
        {/* <Topic key={index} disabled={false} onClick={handleSelectedTopic(topic)}> */}
          {topic}
        </Topic>
      ))}
    </div>
  </div>  )
}

export default GeneratedTopics