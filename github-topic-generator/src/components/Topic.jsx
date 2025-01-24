import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const PillButton = styled(Button)({
    borderRadius: '40px', // Reduced size for a smaller pill shape
    textTransform: 'none', // Keeps text in normal case
    padding: '4px 12px', // Reduced padding for a smaller button
    fontSize: '10px', // Smaller font size
    fontWeight: 530, // Semi-bold font weight
    backgroundColor: '#DCDCF0', // Default background color
    color: 'black',
    fontFamily: "'Poppins', sans-serif", // Modern and elegant font
    '&:hover': {
      backgroundColor: 'var(--hover)', // Background color on hover
    },
  });
  
  const Topic = ({children}) => {
    return (
      <div style={{ padding: '2px' }}>
        <PillButton variant="contained">{children}</PillButton>
      </div>
    );
  };
  
export default Topic