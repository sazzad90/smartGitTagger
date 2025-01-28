import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  existingTopicsAtom,
  generatedTopicsAtom,
  selectedTopicsAtom,
} from "../../state/topicsAtom";
import CircularProgress from "@mui/material/CircularProgress";
import Titlebar from "../../components/Titlebar";
import GeneratedTopics from "./GeneratedTopics";
import {
  existingTopicLoaderAtom,
  generatedTopicLoaderAtom,
} from "../../state/loadersAtom";
import ExistingTopics from "./ExistingTopics";
import {
  isGenerateClickedAtom,
  isFinishClickedAtom,
} from "../../state/buttonAtom";
import GenerateButton from "../../components/GenerateButton";
import FinishButton from "../../components/FinishButton";
import { generateReportAtom } from "../../state/reportAtom";
import Reports from "../reports";

const Topics = () => {
  const topics = useRecoilValue(existingTopicsAtom);
  const [selectedTopics, setSelectedTopics] = useRecoilState(selectedTopicsAtom);
  const [isGenerateClicked, setGenerateClicked] = useRecoilState(
    isGenerateClickedAtom
  );
  const [isFinishClicked, setFinishClicked] =
    useRecoilState(isFinishClickedAtom);
  const [existingTopicLoader, setExistingTopicLoader] = useRecoilState(
    existingTopicLoaderAtom
  );
  const [generatedTopicLoader, setGeneratedTopicLoader] = useRecoilState(
    generatedTopicLoaderAtom
  );
  const [generatedTopics, setGeneratedTopics] =
    useRecoilState(generatedTopicsAtom);
    const [isGenerateReport, setGenerateReport] = useRecoilState(
      generateReportAtom
    );
  const handleGeneration = () => {
    setGenerateClicked(false);
    setGeneratedTopicLoader(true);
    setGeneratedTopics([
      "js",
      "css",
      "e-commerce",
      "transformer",
      "machine-learning",
      "php",
      "ml",
      "e-learning",
      "react",
      "python",
      "java"
    ]);
    const timeout = setTimeout(() => {
      setGeneratedTopicLoader(false);
      setFinishClicked(true);
    }, 1500);
    return () => clearTimeout(timeout);
  };

  const handleFinish=()=>{
    setGenerateReport(true);
  }

  useEffect(() => {    
    const timeout = setTimeout(() => {
      setExistingTopicLoader(false);
      if (!isGenerateClicked) setGenerateClicked(true);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {isGenerateReport ? <Reports />:
        <>
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
              <ExistingTopics existingTopics={topics} />
            </>
          ) : (
            <p>No existing topics available</p>
          )}
        </div>

        {isGenerateClicked && generatedTopics.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4vh",
            }}
          >
            <GenerateButton onClick={handleGeneration} />
          </div>
        ) : (
          <>
            {generatedTopicLoader ? (
              <div
                style={{
                  paddingTop: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                <GeneratedTopics generatedTopics={generatedTopics} setSelectedTopics={setSelectedTopics}/>
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {isFinishClicked ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4vh",
              marginBottom: "4vh",
            }}
          >
            <FinishButton onClick={handleFinish} />
          </div>
        ) : (
          <></>
        )}
        </>
}
      </div>
    </>
  );
};

export default Topics;
