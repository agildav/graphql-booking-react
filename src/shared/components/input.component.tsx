import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

/** Custom props for this input */
interface CustomInputProps {
  /** input id */
  id?: string;
  /** margin of input */
  margin: "dense" | "none" | "normal";
  /** onChange event */
  onChange?: any;
  /** label associated with the input */
  label: string;
  /** name of input */
  name?: string;
  /** type of input */
  type: "email" | "password" | string | undefined;
}

const customStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export function CustomInputTextField(props: CustomInputProps) {
  const classes = customStyles();

  return (
    <TextField
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
