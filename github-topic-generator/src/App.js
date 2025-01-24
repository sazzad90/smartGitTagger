import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [readmeContent, setReadmeContent] = useState('Click to fetch README...');
  const [error, setError] = useState(null);

  const fetchReadme = () => {
    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabUrl = tabs[0].url;

      // Extract owner and repo from the GitHub URL
      const matches = tabUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (matches && matches.length >= 3) {
        const owner = matches[1];
        const repo = matches[2];

        // Fetch README from GitHub API
        fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
          .then((response) => response.json())
          .then((data) => {
            if (data.content) {
              // Decode the Base64 content
              const decodedContent = atob(data.content);
              setReadmeContent(decodedContent);
            } else {
              setReadmeContent('README not found');
            }
          })
          .catch((err) => {
            setError('Error fetching README');
            console.error('Error:', err);
          });
      } else {
        setReadmeContent('Invalid GitHub repository URL');
      }
    });
  };

  useEffect(() => {
    fetchReadme();
  }, []);

  return (
<div style={{ padding: '20px', borderRadius: '10px' }}>
<h2 style={{ color: 'blue', fontFamily: 'Arial, sans-serif' }}>SmartGitTagger</h2>
      <pre>
        {error ? error : readmeContent}
      </pre>
    </div>
  );
};

export default App;
