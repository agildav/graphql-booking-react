import React from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import DateFnsUtils from "@date-io/date-fns";

export interface CustomDateTimePickerProps {
  /** label of picker */
  label?: string;
  /** margin of picker */
  margin?: "dense" | "none" | "normal";
  /** variant of picker */
  inputVariant?: "standard" | "outlined" | "filled";
  /** picker handler */
  onChange: (date: ParsableDate) => void;
  /** picker date and time */
  value: ParsableDate;
}

export function CustomDateTimePicker(props: CustomDateTimePickerProps) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker {...props} />
    </MuiPickersUtilsProvider>
  );
}
