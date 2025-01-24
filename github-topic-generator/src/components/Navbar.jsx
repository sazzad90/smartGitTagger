import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Topics from '../application/topics';
import Analytics from '../application/analytics';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  return (
    <div
      style={{
        display: 'flex',
        height:'8vh',
        flexDirection: 'row',
        justifyContent: 'start',
        borderBottom: '0.5px solid var(--secondary)', // Apply bottom border to navbar
      }}
    >  
    <Router>
      <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
      <Button
        sx={{
          color:  'var(--secondary)',
          backgroundColor: selectedButton === 'topics' ? 'var(--hover)' : '',
          textTransform: 'none',
          width: '100%',
          fontSize: '20px',
          fontWeight: '500',
          paddingTop: '4vh',
          borderBottom: selectedButton === 'topics' ? '2px solid var(--background)' : '',
          borderRadius: 0,
        }}
        onClick={() => handleButtonClick('topics')}
      >
            Topics
          </Button>
        </Link>
        <Link
          to="/analytics"
          style={{
            textDecoration: 'none',
          }}
        >
          <Button
        sx={{
          color: 'var(--secondary)',
          backgroundColor: selectedButton === 'analytics' ? 'var(--hover)' : '',
          textTransform: 'none',
          width: '100%',
          fontSize: '20px',
          fontWeight: '500',
          paddingTop: '4vh',
          borderBottom: selectedButton === 'analytics' ? '2px solid var(--background)' : '',
          borderRadius: 0,
        }}
        onClick={() => handleButtonClick('analytics')}

      >
            Analytics
          </Button>
        </Link>

        <Routes style={{ padding: '16px' }}>
          <Route path="/" element={<Topics />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
    </Router>
    </div>

  );
};

export default Navbar;
