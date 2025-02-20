import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Box, Card, CardContent, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PieChart = ({ matchedTopicsCount, unmatchedTopicsCount }) => {
  // Data for Pie Chart
  const pieData = {
    labels: ["Matched topics", "Unmatched topics"],
    datasets: [
      {
        label: "Topics Comparison",
        data: [matchedTopicsCount, unmatchedTopicsCount],
        backgroundColor: ["#2196f3", "#f44336"],
        borderColor: ["#1976d2", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };
  // Chart options (Optional)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return (
    <Card sx={{
      width: "100%", // Takes full width of the parent
      maxWidth: "450px", // Optional: Limits max width
      maxHeight:'300px',
      margin: "auto", // Center horizontally
      justifyContent: "center", // Centers content vertically
    }}>
  <CardContent sx={{ flexGrow: 1 }}> {/* Ensures content grows/shrinks with parent */}
  <Typography variant="h6" gutterBottom>
        Matched vs Unmatched
      </Typography>
      <Box sx={{ width: "200px", height: "300px", margin: "auto" }}>
  <Pie data={pieData} options={options} />
</Box>    </CardContent>
  </Card>

  );
};

export default PieChart;
