import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Titlebar from "../../components/Titlebar";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Analytics = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
      <Titlebar title={"Popularity"}/>
      <BarChart generatedTopicsCount={70} usedTopicsCount={55}/>

      <Titlebar title={"Accuracy"}/>
      <PieChart matchedTopicsCount={2000} unmatchedTopicsCount={530}/>
    </div>
  );
};

export default Analytics;
