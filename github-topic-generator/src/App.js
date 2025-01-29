import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { existingTopicsAtom } from "./state/topicsAtom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topics from "./application/topics";
import Analytics from "./application/analytics";
import { Alert } from "@mui/material";
import fetchReadmeAndTopics from "./services/fetchGithubData";
import { generateReportAtom } from "./state/reportAtom";

const App = () => {  
  const [url, setURL] = useState("");
  const [readmeContent, setReadmeContent] = useState("");
  const [topics, setTopics] = useRecoilState(existingTopicsAtom);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetchReadmeAndTopics(setReadmeContent, setURL, setTopics, setError);
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
            <div style={{ padding: "10px", overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<Topics readmeContent = {readmeContent} url={url}/>} />
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
