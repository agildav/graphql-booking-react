import React from "react";
import { IBookingProps, IBookingState } from "./booking.model";
import { INavigationState } from "../navigation/mainNavBar.model";

/** Booking component */
class Booking extends React.Component<IBookingProps, IBookingState> {
  initialState: IBookingState = {
    bookings: []
  };

  constructor(props: IBookingProps) {
    super(props);

    this.state = this.initialState;
  }

  componentDidMount() {
    const currentNavigation: INavigationState = {
      isAtBookings: true,
      isAtEvents: false,
      isAtLogin: false,
      isAtRegister: false,
      isAtUsers: false
    };

    this.props.updateNavigation(currentNavigation);
  }

  render() {
    return <h1>Booking page</h1>;
  }
}

export default Booking;
