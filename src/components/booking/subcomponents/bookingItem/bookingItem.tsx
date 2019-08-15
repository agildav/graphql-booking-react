import React from "react";
import { Typography } from "@material-ui/core";
import { IBooking } from "../../booking.model";
import { IAppState } from "../../../../app/App.model";

import "./bookingItem.scss";
import { CustomButton } from "../../../../shared/components/button.component";

/** event item wrapped inside a list */
export const BookingItem = (props: {
  appState?: IAppState;
  booking: IBooking;
  cancelBooking: Function;
  isCancelingBooking: boolean;
}) => {
  const { _id } = props.booking;
  const { event } = props.booking;

  const handleCancelBooking = () => {
    if (_id) {
      return props.cancelBooking(_id);
    }
  };

  return (
    <li className="booking-list-item">
      <div className="booking-slim-info">
        <Typography className="event-title" variant="h6" color="textPrimary">
          {event.title}
        </Typography>
        <div className="slim-wrapper">
          <Typography
            className="event-price"
            variant="subtitle2"
            color="textSecondary"
          >
            ${event.price}
          </Typography>
          <Typography
            className="event-date"
            variant="subtitle2"
            color="textSecondary"
          >
            {new Date(event.date).toDateString()}
          </Typography>
        </div>
      </div>
      <div className="booking-actions">
        <CustomButton
          type="button"
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleCancelBooking}
          disabled={props.isCancelingBooking}
        >
          Cancel
        </CustomButton>
      </div>
    </li>
  );
};
