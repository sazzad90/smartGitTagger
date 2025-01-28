import React, { useEffect } from "react";
import Titlebar from "../../components/Titlebar";
import ReportTable from "./ReportTable";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  existingTopicsAtom,
  generatedTopicsAtom,
  selectedTopicsAtom,
} from "../../state/topicsAtom";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import { Box, Divider } from "@mui/material";
import CloseButton from "../../components/CloseButton";

const Reports = () => {
  const existingTopics = useRecoilValue(existingTopicsAtom);
  const generatedTopics = useRecoilValue(generatedTopicsAtom);
  const selectedTopics = useRecoilValue(selectedTopicsAtom);

  const [matchedTopics, setMatchedTopics] = useRecoilState(existingTopicsAtom);
  const [unmatchedTopics, setUnmatchedTopics] = useRecoilState(existingTopicsAtom);

  const tableData = {
    existingTopics,
    generatedTopics,
    selectedTopics,
    matchedTopics,
    unmatchedTopics,
  };

  const handleClose = () => {
    window.close(); 
  };

  useEffect(()=>{    
    setMatchedTopics(selectedTopics.filter((topic) =>
      existingTopics.includes(topic)
    ));
    setUnmatchedTopics(selectedTopics.filter((topic) =>
      existingTopics.includes(topic)
    ));
  },[])
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <Titlebar title={"Summary Report"} />
      <CloseButton onClick={handleClose}/>
    </div>
      <ReportTable data={tableData} />
      <Divider sx={{ my: 2 }} /> 
      <Box style={{height: '300px'}}>
        <BarChart
          generatedTopicsCount={generatedTopics.length}
          usedTopicsCount={selectedTopics.length}
        />
      </Box>
      <Divider sx={{ my: 2 }} /> 
      <Box style={{height: '300px'}}>
        <PieChart
          matchedTopicsCount={matchedTopics.length}
          unmatchedTopicsCount={unmatchedTopics.length}
        />
      </Box>
    </div>
  );
};

export default Reports;
