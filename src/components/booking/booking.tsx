import React from "react";
import { IBookingProps, IBookingState } from "./booking.model";
import { INavigation } from "../navigation/mainNavBar.model";

/** Booking component */
class Booking extends React.Component<IBookingProps, IBookingState> {
  initialState: IBookingState = {
    bookings: []
  };

  constructor(props: IBookingProps) {
    super(props);

    const currentNavigation: INavigation = {
      isAtBookings: true,
      isAtEvents: false,
      isAtLogin: false,
      isAtRegister: false,
      isAtUsers: false
    };

    this.props.updateNavigation(currentNavigation);

    this.state = this.initialState;
  }

  render() {
    return <h1>Booking page</h1>;
  }
}

export default Booking;
