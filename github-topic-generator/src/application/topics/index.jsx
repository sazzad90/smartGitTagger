import React, { useEffect, useState } from "react";
import Topic from "../../components/Topic";
import { useRecoilValue } from 'recoil';
import { existingTopicsAtom } from '../../state/topicsAtom';
import CircularProgress from '@mui/material/CircularProgress';
import Titlebar from "../../components/Titlebar";

const Topics = () => {
  const topics = useRecoilValue(existingTopicsAtom);
  console.log('topics inside topics: ', topics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (could be API call, etc.)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <>
    <Titlebar title={"Existing Topics"}/>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px", maxWidth: "100%" 
  }}
>
  {loading ? (
    <div style={{paddingTop: '50px'}}>
    <CircularProgress
      size={24}
      sx={{
        color: 'var(--background)', 
      }}
    />
    </div>
  ) : topics && topics.length > 0 ? (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "100%", paddingTop:'5px' }}>
      {topics.map((topic, index) => (
        <Topic key={index}>{topic}</Topic>
      ))}
    </div>
  ) : (
    <p>No existing topics available</p>
  )}
</div>
</>
  );
};

export default Topics;
