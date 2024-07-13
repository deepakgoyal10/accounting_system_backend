import { Typography } from "@mui/material";
import React from "react";

const PageWrapper = ({ children, heading = "" }) => {
  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: "600", marginBottom: "20px" }}>
        {heading}
      </Typography>
      <div className="page-wrapper">{children}</div>
    </div>
  );
};

export default PageWrapper;
