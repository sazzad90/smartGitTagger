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
      <Titlebar title={"Summary Report"} />
      <ReportTable data={tableData} />
      <Divider sx={{ my: 2 }} /> {/* Divider with vertical margin */}
      <Box style={{height: '300px'}}>
        <BarChart
          generatedTopicsCount={generatedTopics.length}
          usedTopicsCount={selectedTopics.length}
        />
      </Box>
      <Divider sx={{ my: 2 }} /> {/* Divider with vertical margin */}
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
