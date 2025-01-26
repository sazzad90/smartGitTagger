import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { Button } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState("topics");
  const navigate = useNavigate();

  useEffect(() => {
    // This will update the selected button based on the route
    if (location.pathname === "/") {
      setSelectedButton("topics");
    } else if (location.pathname === "/analytics") {
      setSelectedButton("analytics");
    }
  }, [location]);

    useEffect(() => {
        navigate("/"); 
    }, []);

    
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            color: "var(--secondary)",
            themeColor: selectedButton === "topics" ? "#DDDDFA" : "",
            textTransform: "none",
            width: "100%",
            fontSize: "15px",
            fontWeight: "500",
            paddingTop: "2vh",
            paddingLeft: "4vh",
            paddingRight: "4vh",
            borderBottom: selectedButton === "topics" ? "2px solid var(--theme)" : "",
            borderRadius: 0,
          }}
          onClick={() => handleButtonClick("topics")}
        >
          Topics
        </Button>
      </Link>
      <Link to="/analytics" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            color: "var(--secondary)",
            themeColor: selectedButton === "analytics" ? "#DDDDFA" : "",
            textTransform: "none",
            width: "100%",
            fontSize: "15px",
            fontWeight: "500",
            paddingTop: "2vh",
            paddingLeft: "4vh",
            paddingRight: "4vh",
            borderBottom: selectedButton === "analytics" ? "2px solid var(--theme)" : "",
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

export default Navbar;
