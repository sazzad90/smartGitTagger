import React from 'react';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ClipboardButton = ({ onClick }) => {
  return (
    <Button
      style={{
        color: 'white',
        backgroundColor: 'green', // Green color for a "Finish" action
        borderRadius: '8px',
      }}
      variant="contained"
      startIcon={<CheckCircleIcon />}
      onClick={onClick}
      sx={{
        width: '138px',         // Adjust width (example: 100px)
        height: '32px',         // Adjust height for button size
        fontSize: '12px',       // Adjust text size (smaller font size)
        fontWeight: '30px',     // Font weight adjustment
        paddingLeft: '2px',     // Adjust padding for better proportions
        paddingRight: '2px',    // Adjust padding for better proportions
        textTransform: 'none',  // Keep text from being capitalized
      }}
    >
      Copy to Clipboard
    </Button>
  );
};

export default ClipboardButton;
