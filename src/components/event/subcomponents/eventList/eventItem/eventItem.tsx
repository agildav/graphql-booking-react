import React from "react";
import { IEvent } from "../../../event.model";
import { CustomButton } from "../../../../../shared/components/button.component";
import { Typography } from "@material-ui/core";
import { IAppState } from "../../../../../app/App.model";

import "./eventItem.scss";

/** event item wrapped inside a list */
export const EventItem = (props: { event: IEvent; appState: IAppState }) => {
  const { price, title, creator } = props.event;
  const { userId } = props.appState.auth;

  return (
    <li className="event-list-item">
      <div className="event-slim-info">
        <Typography variant="h6" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          ${price}
        </Typography>
      </div>
      <div className="event-details">
        {userId !== creator._id ? (
          <CustomButton>View details</CustomButton>
        ) : (
          <Typography variant="subtitle1">You are the owner</Typography>
        )}
      </div>
    </li>
  );
};
