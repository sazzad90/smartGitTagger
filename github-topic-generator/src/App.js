import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useRecoilState } from "recoil";
import { existingTopicsAtom } from "./state/topicsAtom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topics from "./application/topics";
import Analytics from "./application/analytics";
import { Alert, CircularProgress } from "@mui/material";

const App = () => {
  const [readmeContent, setReadmeContent] = useState("");
  const [topics, setTopics] = useRecoilState(existingTopicsAtom);
  const [error, setError] = useState(null);

  const fetchReadmeAndTopics = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabUrl = tabs[0].url;

      // Extract owner and repo from the GitHub URL
      const matches = tabUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (matches && matches.length >= 3) {
        const owner = matches[1];
        const repo = matches[2];

        try {
          // Fetch README
          const readmeResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`
          );
          const readmeData = await readmeResponse.json();

          if (readmeData.content) {
            const decodedContent = atob(readmeData.content);
            console.log(decodedContent);
            setReadmeContent(decodedContent);
          } else {
            setReadmeContent("README not found");
          }

          // Fetch Topics
          const topicsResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/topics`,
            {
              method: "GET",
              headers: {
                Accept: "application/vnd.github.mercy-preview+json",
              },
            }
          );

          if (!topicsResponse.ok) {
            throw new Error("Failed to fetch topics");
          }

          const topicsData = await topicsResponse.json();
          if (topicsData.names && topicsData.names.length > 0) {
            setTopics(topicsData.names);
            console.log(topicsData.names);
          }
        } catch (err) {
          setError("Error fetching data");
          console.error("Error:", err);
        }
      } else {
        setReadmeContent("Invalid github repository URL");
      }
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchReadmeAndTopics();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      {readmeContent === "README not found" ||
      readmeContent === "Invalid github repository URL" ? (
        <Alert severity="error" style={{ margin: "10px", textAlign: "center" }}>
          {readmeContent}
        </Alert>
      ) : (
        <div style={{ borderRadius: "10px" }}>
          <Router>
            <Navbar />
            <div style={{ padding: "10px" }}>
              <Routes>
                <Route path="/" element={<Topics />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </div>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
