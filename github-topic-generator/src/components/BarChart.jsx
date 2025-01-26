import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ generatedTopicsCount, usedTopicsCount }) => {
  // Data for Bar Chart
  const barData = {
    labels: ["Generated topics", "Used topics"],
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
<Card sx={{ maxWidth: "600px", margin: "auto" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Generated vs Used
          </Typography>
          <Bar data={barData} options={options} />
        </CardContent>
      </Card>

  );
};

export default BarChart;
