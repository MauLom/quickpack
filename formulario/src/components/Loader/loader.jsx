import React from "react";
import "./spinner.css";
import {Box} from '@mui/material'

export default function LoadingSpinner() {
  return (
    <Box sx={{ position:"absolute",width:"100%", height:"100%", backgroundColor: "rgba(143, 143, 143, 0.5) !important" }}>
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    </Box>

  );
}