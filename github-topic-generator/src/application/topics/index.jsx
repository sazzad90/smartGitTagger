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
  isClipboardClickedAtom,
} from "../../state/buttonAtom";
import GenerateButton from "../../components/GenerateButton";
import FinishButton from "../../components/FinishButton";
import { generateReportAtom } from "../../state/reportAtom";
import Reports from "../reports";
import axios from "axios";
import ClipboardButton from "../../components/ClipboardButton";
import { Snackbar, Alert } from "@mui/material";

const Topics = ({ readmeContent, url }) => {
  const topics = useRecoilValue(existingTopicsAtom);
  const [selectedTopics, setSelectedTopics] =
    useRecoilState(selectedTopicsAtom);
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
  const [isGenerateReport, setGenerateReport] =
    useRecoilState(generateReportAtom);

  const [isClipboardClicked, setClipboardClicked] = useRecoilState(
    isClipboardClickedAtom
  );
  const handleGeneration = async () => {
    try {
      setGenerateClicked(false);
      setGeneratedTopicLoader(true);

      const response = await axios.post(
        "http://localhost:5001/api/topics/topic-generation",
        { test_readme: readmeContent }
      );
      let generated_topics = response.data.generated_topics;
      console.log("generated_topics at frontend: ", generated_topics);

      if (generated_topics.length > 20) {
        generated_topics = generated_topics.slice(0, 20);
      }
      console.log("generated_topics at frontend: ", generated_topics);

      setGeneratedTopics(generated_topics);
      setGeneratedTopicLoader(false);
      setClipboardClicked(true);
      // setFinishClicked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = Array.isArray(selectedTopics)
      ? selectedTopics.join(", ")
      : selectedTopics;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setOpenSnackbar(true);
        setClipboardClicked(false);
        setFinishClicked(true);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };
  
  const handleFinish = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/repositories/",
        {
          url: url,
          readme: readmeContent,
          existing_topics: topics,
          selected_Topics: selectedTopics,
        }
      );
      console.log("database response: ", response.data);
    } catch (error) {
      console.error(error);
    }
    setGenerateReport(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExistingTopicLoader(false);
      if (!isGenerateClicked) setGenerateClicked(true);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {isGenerateReport ? (
          <Reports />
        ) : (
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
                  <ExistingTopics
                    existingTopics={topics}
                    setSelectedTopics={setSelectedTopics}
                  />
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
                    <GeneratedTopics
                      generatedTopics={generatedTopics}
                      setSelectedTopics={setSelectedTopics}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            {isClipboardClicked ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "4vh",
                  marginBottom: "4vh",
                }}
              >
                <ClipboardButton onClick={copyToClipboard} />
              </div>
            ) : (
              <></>
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
        )}
      </div>
    </>
  );
};

export default Topics;
