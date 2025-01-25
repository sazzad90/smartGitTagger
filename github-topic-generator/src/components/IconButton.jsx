import React from 'react';
import { Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const IconButton = ({onClick}) => {
  return (
    <Button
    style={{color: 'white', backgroundColor: 'var(--theme)', borderRadius:'8px'}}
      variant="contained"
      startIcon={<ConstructionIcon />}
      onClick={onClick}
      sx={{
        width: '100px',        // Adjust width (example: 100px)
        height: '40px',        // Adjust height for button size
        fontSize: '12px',      // Adjust text size (smaller font size)
        fontWeight:'30px',
        paddingLeft: '6px',   // Adjust padding for better proportions
        paddingRight: '6px',   // Adjust padding for better proportions
        textTransform: 'none', // Keep text from being capitalized
      }}
    >
      Generate
    </Button>
  );
};

export default IconButton;
