import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Box } from "@mui/material";

const ReportTable = ({ data }) => {
    const matchedTopics = data.selectedTopics.filter((topic) => data.existingTopics.includes(topic));
    const unmatchedTopics = data.selectedTopics.filter((topic) => !data.existingTopics.includes(topic));
  const rows = [
    { name: "Existing Topics", count: data.existingTopics.length },
    { name: "Generated Topics", count: data.generatedTopics.length },
    { name: "Selected Topics", count: data.selectedTopics.length },
    { name: "Matched Topics[with existing]", count: matchedTopics.length },
    { name: "Unmatched Topics[with existing]", count: unmatchedTopics.length },
  ];

  return (
    <TableContainer
    component={Box}
    style={{
      maxWidth: "600px",
      margin: "auto",
      marginTop: "10px",
    }}
  >
    <Table sx={{ minWidth: 300 }}>
      <TableHead>
        <TableRow>
          <TableCell
            style={{
              fontWeight: "bold",
              fontSize: "12px", // Smaller font size
              padding: "8px", // Smaller padding for cells
            }}
          >
            Topic Type
          </TableCell>
          <TableCell
            style={{
              fontWeight: "bold",
              fontSize: "12px", // Smaller font size
              padding: "8px", // Smaller padding for cells
            }}
            align="right"
          >
            Count
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell
              style={{
                fontSize: "11px", // Smaller font size
                padding: "6px", // Reduce padding for compact rows
              }}
            >
              {row.name}
            </TableCell>
            <TableCell
              style={{
                fontSize: "11px", // Smaller font size
                padding: "6px", // Reduce padding for compact rows
              }}
              align="right"
            >
              {row.count}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default ReportTable;
