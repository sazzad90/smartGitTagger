import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PillButton = styled(Button)({
  borderRadius: "40px", 
  textTransform: "none", 
  padding: "4px 12px", 
  fontSize: "10px", 
  fontWeight: 530, 
  backgroundColor: "#DCDCF0", // Default background color
  color: "black",
  fontFamily: "'Poppins', sans-serif", // Modern and elegant font
  "&:hover": {
    backgroundColor: "var(--hover)", // Background color on hover
  },
});

const Topic = ({ children, selected, disabled, onClick }) => {
  return (
    <div style={{ padding: "2px" }}>
      <PillButton
        variant="contained"
        onClick={!disabled ? onClick : undefined} // Prevent onClick if disabled
        sx={{
          opacity: disabled ? 0.6 : 1,
          backgroundColor: selected ? "var(--hover)" : "#DCDCF0", // Selected color
        }}
      >
        {children}
      </PillButton>
    </div>
  );
};

export default Topic;
