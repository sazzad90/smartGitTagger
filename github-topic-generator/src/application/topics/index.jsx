import React, { useEffect, useState } from "react";
import Topic from "../../components/Topic";
import { useRecoilValue } from "recoil";
import { existingTopicsAtom } from "../../state/topicsAtom";
import CircularProgress from "@mui/material/CircularProgress";
import Titlebar from "../../components/Titlebar";
import IconButton from "../../components/IconButton";

const Topics = () => {
  const [isGenerateClicked, setGenerateClicked] = useState(false);
  const topics = useRecoilValue(existingTopicsAtom);
  console.log("topics inside topics: ", topics);
  const [existingTopicLoader, setExistingTopicLoader] = useState(true);
  const [generatedTopicLoader, setgeneratedTopicLoader] = useState(false);
  const [generatedTopics, setGeneratedTopics] = useState([]);

  const handleGeneration = () => {
    console.log('here');
    
    setGenerateClicked(false);
    setgeneratedTopicLoader(true);
    setGeneratedTopics([
      "js",
      "css",
      "e-commerce",
      "transformer",
      "machine-learning",
    ]);
    // code for topic generation
    const timeout = setTimeout(() => {
      setgeneratedTopicLoader(false);
    }, 2000);
    return () => clearTimeout(timeout);
  };


  useEffect(() => {
    // Simulate loading process (could be API call, etc.)
    const timeout = setTimeout(() => {
      setExistingTopicLoader(false);
      setGenerateClicked(true);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <>
    <div style={{display:'flex', flexDirection:'column'}}>
      <Titlebar title={"Existing Topics"} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          maxWidth: "100%",
        }}
      >
        {existingTopicLoader ? (
          <div style={{ paddingTop: "50px" }}>
            <CircularProgress
              size={24}
              sx={{
                color: "var(--theme)",
              }}
            />
          </div>
        ) : topics && topics.length > 0 ? (
          <>
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
                {topics.map((topic, index) => (
                  <Topic key={index} clickable={false}>
                    {topic}
                  </Topic>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No existing topics available</p>
        )}
      </div>

      {isGenerateClicked ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4vh",
            }}
          >
            <IconButton onClick={()=>handleGeneration()} />
          </div>
        ) : (
          <>
            {generatedTopicLoader ? (
              <div style={{ paddingTop: "50px",
              display: "flex",
              justifyContent: "center", }}>
                <CircularProgress
                  size={24}
                  sx={{
                    color: "var(--theme)",
                  }}
                />
              </div>
            ) : generatedTopics && generatedTopics.length > 0 ? (
              <>
                    <Titlebar title={"Generated Topics"} />

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
                      <Topic key={index} clickable={false}>
                        {topic}
                      </Topic>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Topics;
