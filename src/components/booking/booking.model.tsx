import { IAppState } from "../../app/App.model";

/** Props received by main App */
export interface IBookingProps {
  appState: IAppState;
  updateNavigation: Function;
}

/** Properties received by user */
export interface IBookingInput {}

/** Event model */
export interface IBooking extends IBookingInput {}

/** Booking state */
export interface IBookingState {
  bookings: IBooking[];
}
