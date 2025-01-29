const fetchReadmeAndTopics = async (setReadmeContent, setURL, setTopics, setError) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabUrl = tabs[0]?.url;
  
      // Extract owner and repo from the GitHub URL
      const matches = tabUrl?.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (matches && matches.length >= 3) {
        const owner = matches[1];
        const repo = matches[2];
  
        try {
          // Fetch README
          const readmeResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`
          );
          const readmeData = await readmeResponse.json();          
          const readme = readmeData.content
          if (readme.length > 5) {            
            const decodedContent = atob(readmeData.content);
            setReadmeContent(decodedContent);
            setURL(`https://api.github.com/repos/${owner}/${repo}/readme`);
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
  
  export default fetchReadmeAndTopics;
  