import React from "react";
import { IEvent } from "../../event.model";
import { EventItem } from "./eventItem/eventItem";
import { IAppState } from "../../../../app/App.model";

import "./eventList.scss";

/** events wrapper */
export const EventList = (props: { events: IEvent[]; appState: IAppState }) => {
  const events = props.events;

  return (
    events && (
      <ul className="event-list">
        {events.map((event: IEvent) => {
          return (
            <EventItem
              key={event._id}
              event={event}
              appState={props.appState}
            />
          );
        })}
      </ul>
    )
  );
};
