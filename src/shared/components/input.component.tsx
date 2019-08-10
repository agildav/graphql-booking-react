import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
  type?: "email" | "password" | string;
}

const customStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export function CustomInputTextField(props: CustomInputTextFieldProps) {
  const classes = customStyles();

  return (
    <TextField
      autoComplete={props.autoComplete}
      id={props.id}
      onChange={props.onChange}
      label={props.label}
      name={props.name}
      className={classes.root}
      margin={props.margin}
      type={props.type}
    />
  );
}
