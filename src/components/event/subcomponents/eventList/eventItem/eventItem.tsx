import React from "react";
import { IEvent } from "../../../event.model";
import { CustomButton } from "../../../../../shared/components/button.component";
import { Typography } from "@material-ui/core";
import { IAppState } from "../../../../../app/App.model";

import "./eventItem.scss";

/** event item wrapped inside a list */
export const EventItem = (props: { event: IEvent; appState: IAppState }) => {
  const { price, title, date, creator } = props.event;
  const { userId } = props.appState.auth;

  return (
    <li className="event-list-item">
      <div className="event-slim-info">
        <Typography className="event-title" variant="h6" color="textPrimary">
          {title}
        </Typography>
        <div className="slim-wrapper">
          <Typography
            className="event-price"
            variant="subtitle2"
            color="textSecondary"
          >
            ${price}
          </Typography>
          <Typography
            className="event-date"
            variant="subtitle2"
            color="textSecondary"
          >
            {new Date(date).toDateString()}
          </Typography>
        </div>
      </div>
      <div className="event-details">
        {userId !== creator._id ? (
          <CustomButton variant="outlined" size="small" color="primary">
            Details
          </CustomButton>
        ) : (
          <Typography variant="overline">You're the owner</Typography>
        )}
      </div>
    </li>
  );
};
