import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

/** Custom props for this button */
export interface CustomButtonProps {
  /** id of button */
  id?: string;
  /** children passed */
  children?: any;
  /** color of button */
  color?: "inherit" | "primary" | "secondary" | "default";
  /** disabled button */
  disabled?: boolean;
  /** onClick event handler */
  onClick?: any;
  /** size of button */
  size?: "small" | "medium" | "large";
  /** type of button */
  type?: "button" | "reset" | "submit";
  /** variant type of button */
  variant?: "text" | "outlined" | "contained";
}

const customStyles = makeStyles({
  /** Base button */
  root: {
    font: "inherit",
    textDecoration: "none"
  },
  /** Default button */
  default: {},
  /** Primary button */
  primary: {},
  /** Secondary button */
  secondary: {
    background: blueGrey[300],
    "&:hover": {
      backgroundColor: blueGrey[500]
    },
    "&:active": {
      backgroundColor: blueGrey[500]
    },
    "&.active": {
      backgroundColor: blueGrey[500]
    }
  }
});

export function CustomButton(props: CustomButtonProps) {
  const classes = customStyles();

  /** Apply dynamic colors given a custom button */
  let colorStyles: string;
  switch (props.color) {
    case "primary":
      colorStyles = classes.primary;
      break;
    case "secondary":
      colorStyles = classes.secondary;
      break;
    default:
      colorStyles = classes.default;
      break;
  }

  return (
    <Button
      {...props}
      classes={{
        root: classes.root,
        contained: colorStyles,
        text: colorStyles,
        outlined: colorStyles
      }}
    >
      {props.children}
    </Button>
  );
}
