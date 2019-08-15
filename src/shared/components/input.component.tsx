import React from "react";
import { TextField } from "@material-ui/core";

/** Custom props for this input */
export interface CustomInputTextFieldProps {
  /** input id */
  id?: string;
  /** autocomplete of input */
  autoComplete?: "on" | "off";
  /** margin of input */
  margin?: "dense" | "none" | "normal";
  /** onChange event */
  onChange?: any;
  /** label associated with the input */
  label?: string;
  /** name of input */
  name?: string;
  /** type of input */
  type?: "email" | "password" | "text" | string;
  /** variant of input */
  variant?: "outlined" | "standard" | "filled" | string | any;
  /** take fullWidth */
  fullWidth?: boolean;
  /** max length of input */
  maxLength?: number;
  /** convert this into a textarea like */
  multiline?: boolean;
  /** number of initial rows */
  rows?: number;
  /** max number of rows */
  rowsMax?: number;
}

export function CustomInputTextField(props: CustomInputTextFieldProps) {
  return (
    <TextField
      inputProps={{
        maxLength: props.maxLength
      }}
      {...props}
    />
  );
}
