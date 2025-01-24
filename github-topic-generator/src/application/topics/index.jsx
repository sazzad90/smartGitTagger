import React from "react";
import Topic from "../../components/Topic";

const Topics = ({ topics }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '100%', paddingTop:'5px' }}>
          {topics && topics.length > 0 ? (
            topics.map((topic, index) => (
                <Topic key={index}>{topic}</Topic>
            ))
          ) : (
            <p>No topics available</p>
          )}
        </div>
      );
};

export default Topics;
