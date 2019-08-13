import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface CustomSpinnerIndeterminateProps {
  color?: "primary" | "secondary" | "inherit";
  disableShrink?: boolean;
  size?: number | string;
  thickness?: number;
  value?: number;
  variant?: "determinate" | "indeterminate" | "static";
}

export function CustomSpinnerIndeterminate(
  props: CustomSpinnerIndeterminateProps
) {
  return <CircularProgress {...props} />;
}
