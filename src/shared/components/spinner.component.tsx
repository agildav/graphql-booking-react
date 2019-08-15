import React from "react";
import { CircularProgress } from "@material-ui/core";

export interface CustomSpinnerProps {
  color?: "primary" | "secondary" | "inherit";
  disableShrink?: boolean;
  size?: number | string;
  thickness?: number;
  value?: number;
  variant: "determinate" | "indeterminate" | "static";
}

export function CustomSpinner(props: CustomSpinnerProps) {
  return <CircularProgress {...props} />;
}
