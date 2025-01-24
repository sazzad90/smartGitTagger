import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        color: "white",
        backgroundColor: "var(--background)",
        height: "8vh",
        fontFamily: "monospace",
        fontSize: "20px",
        fontWeight: "bolder",
        paddingTop:'4vh',
        paddingLeft:'3vh'
      }}
    >
      SmartGitTagger
    </div>
  );
};

export default Header;
