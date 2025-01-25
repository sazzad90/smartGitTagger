import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState("topics");
  const navigate = useNavigate(); // Ensure this is inside Router context

  // On component mount, navigate to the default page ("/")
  useEffect(() => {
    navigate("/"); // This will make sure Topics is loaded initially
  }, [navigate]);

  // Handle button click
  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "topics") {
      navigate("/"); // Navigate to Topics page
    } else {
      navigate("/analytics"); // Navigate to Analytics page
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "8vh",
        flexDirection: "row",
        justifyContent: "start",
        borderBottom: "0.5px solid var(--secondary)", // Apply bottom border to navbar
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          sx={{
            color: "var(--secondary)",
            backgroundColor: selectedButton === "topics" ? "#DDDDFA" : "",
            textTransform: "none",
            width: "100%",
            fontSize: "15px",
            fontWeight: "500",
            paddingTop: "2vh",
            paddingLeft: "4vh",
            paddingRight: "4vh",
            borderBottom:
              selectedButton === "topics" ? "2px solid var(--background)" : "",
            borderRadius: 0,
          }}
          onClick={() => handleButtonClick("topics")}
        >
          Topics
        </Button>
      </Link>
      <Link
        to="/analytics"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          sx={{
            color: "var(--secondary)",
            backgroundColor: selectedButton === "analytics" ? "#DDDDFA" : "",
            textTransform: "none",
            width: "100%",
            fontSize: "15px",
            fontWeight: "500",
            paddingTop: "2vh",
            paddingLeft: "4vh",
            paddingRight: "4vh",
            borderBottom:
              selectedButton === "analytics" ? "2px solid var(--background)" : "",
            borderRadius: 0,
          }}
          onClick={() => handleButtonClick("analytics")}
        >
          Analytics
        </Button>
      </Link>
    </div>
  );
};

export default Navbar
