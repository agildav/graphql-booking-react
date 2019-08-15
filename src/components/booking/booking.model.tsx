import { IAppState } from "../../app/App.model";
import { IEvent } from "../event/event.model";
import { IUser } from "../user/user.model";

/** Props received by main App */
export interface IBookingProps {
  appState: IAppState;
  updateNavigation: Function;
}

/** Event model */
export interface IBooking {
  _id: string;
  event: IEvent;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

/** Booking state */
export interface IBookingState {
  bookings: IBooking[];
}
