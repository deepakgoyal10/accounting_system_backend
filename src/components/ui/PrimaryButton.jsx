import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({
  children,
  sx = {},
  type = "button",
  variant = "contained",
  ...restProps
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      sx={{ mt: 3, mb: 2, ...sx }}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
