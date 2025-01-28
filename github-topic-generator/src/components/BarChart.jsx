import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Box, Card, CardContent, Typography } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ generatedTopicsCount, usedTopicsCount }) => {
  const barData = {
    labels: ["Generated topics", "Selected topics"],
    datasets: [
      {
        label:"",
        data: [generatedTopicsCount, usedTopicsCount],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderColor: ["#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

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
    width: "100%", 
    maxWidth: "450px", 
    maxHeight:'300px',
    margin: "auto", 
    justifyContent: "center", 
  }}>
  <CardContent sx={{ flexGrow: 1 }}> {/* Ensures content grows/shrinks with parent */}
  <Typography variant="h6" gutterBottom>
            Generated vs Selected
          </Typography>
          <Box sx={{ width: "300px", height: "300px", margin: "auto" }}>
          <Bar data={barData} options={options} />
</Box>
        </CardContent>
      </Card>

  );
};

export default BarChart;
