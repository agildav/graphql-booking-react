import React from "react";
import { IAppState } from "../../../app/App.model";
import { IBooking } from "../booking.model";
import { BookingItem } from "./bookingItem/bookingItem";

import "./bookingList.scss";

/** bookings wrapper */
export const BookingList = (props: {
  bookings: IBooking[];
  appState?: IAppState;
  cancelBooking: Function;
  isCancelingBooking: boolean;
}) => {
  const bookings = props.bookings;

  return (
    bookings && (
      <ul className="booking-list">
        {bookings.map((booking: IBooking) => {
          return (
            <BookingItem
              key={booking._id}
              booking={booking}
              appState={props.appState}
              cancelBooking={props.cancelBooking}
              isCancelingBooking={props.isCancelingBooking}
            />
          );
        })}
      </ul>
    )
  );
};
