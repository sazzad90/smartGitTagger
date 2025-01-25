import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Titlebar = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "6px",
      }}
    >
      <Typography sx={{ fontWeight: "540", fontSize: '15px', color: "var(--background)", borderRadius: "10px",
        boxShadow: "0px 1px 2px var(--hover)", borderColor: "var(--background)", padding:'6px'}}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ color: "var(--secondary)", marginTop: "4px" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Titlebar;
