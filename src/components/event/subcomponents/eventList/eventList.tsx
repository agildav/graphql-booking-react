import React from "react";
import { IEvent } from "../../event.model";
import { EventItem } from "./eventItem/eventItem";
import { IAppState } from "../../../../app/App.model";

import "./eventList.scss";

/** events wrapper */
export const EventList = (props: {
  events: IEvent[];
  appState: IAppState;
  eventBookings: {
    isOpenEventBookingModal: boolean;
    closeEventModal: Function;
    openBookEventModal: Function;
    isBookingEvent: boolean;
    handleEventBooking: Function;
    selectedEventForBooking: IEvent;
  };
}) => {
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
              eventBooking={props.eventBookings}
            />
          );
        })}
      </ul>
    )
  );
};
