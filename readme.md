
## SmartGitTagger

A Chrome extension designed to automate and optimize the process of generating suitable topics (or tags) for GitHub repositories based on the content of their README files. 


## Project description

SmartGitTagger offers a robust solution by automating the topic generation process using a state-of-the-art LLM. It analyzes the README file of a repository and generates highly relevant and optimized topics based on the content. SmartGitTagger also integrates with GitHub’s API to fetch additional metadata such as existing topics to further refine the topic suggestions.

### Key features:

#### AI-Powered Topic Generation: 
Automatically generates relevant and optimized topics for GitHub repositories by analyzing the content of README files.

#### API Integration: 
Integrate with GitHub’s API to retrieve repository metadata (e.g. existing topics) and incorporate them into the topic generation process.

#### Topic Generation Reports:
It provides a basic summary report of generated topics, including verdicts (approved, recommended, or irrelevant topics) and key indicators (e.g., topic relevance and popularity).


#### Chrome Extension Functionality:
It's functionality is handled through building a chrome extension on top of it.

## Installation

Clone the project and run following commands:
#### For Client:
```bash
  cd smartGitTagger
  cd github-topic-generator
  npm install 
  npm run dev
```

#### For Server:
```bash
  cd server
  npm install 
  npm run dev
```

#### For FastApi-server:
```bash
  cd fastapi-server
  uvicorn main:app --reload
```
    
## Screenshots

![Invalid Github URL](https://github.com/user-attachments/assets/c49b4c62-d476-4562-9b31-e235c6db8a92)


![Generated and Existing topics](https://github.com/user-attachments/assets/1505f4b3-f4f7-482b-a2c9-0e41807547ed)


![Selected topics to use](https://github.com/user-attachments/assets/961a3c28-58f6-48b0-b012-62788f2e62e0)

![Topics report](https://github.com/user-attachments/assets/5bd1953c-14a2-44ba-aabb-b2f768af73d9)


![Report Analysis](https://github.com/user-attachments/assets/cf0283e5-6627-463e-aae1-d5eb9cdf89b8)

