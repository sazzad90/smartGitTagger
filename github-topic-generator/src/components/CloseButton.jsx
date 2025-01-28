import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({onClick}) => {

  return (
<Button
style={{
  color: 'white',
  backgroundColor: 'red', // Green color for a "Finish" action
  borderRadius: '8px',
}}
variant="contained"
startIcon={<CloseIcon />}
onClick={onClick}
sx={{
  width: '80px',         // Adjust width (example: 100px)
  height: '32px',         // Adjust height for button size
  fontSize: '12px',       // Adjust text size (smaller font size)
  fontWeight: '30px',     // Font weight adjustment
  paddingLeft: '4px',     // Adjust padding for better proportions
  paddingRight: '5px',    // Adjust padding for better proportions
  textTransform: 'none',  // Keep text from being capitalized
}}
>
Close
</Button>
  );
};

export default CloseButton;
