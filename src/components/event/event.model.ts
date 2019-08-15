import { IUser } from "../user/user.model";
import { IAppState } from "../../app/App.model";

/** Props received by main App */
export interface IEventProps {
  appState: IAppState;
  updateNavigation: Function;
}

/** Properties received by user */
export interface IEventInput {
  title: string;
  description: string;
  price: number;
  date: string;
}

/** Event model */
export interface IEvent extends IEventInput {
  _id: string;
  createdAt: string;
  creator: IUser;
}

/** Event state */
export interface IEventState {
  events: IEvent[];
  createEventInput: IEventInput;
  isOpenEventCreationModal: boolean;
  isOpenEventBookingModal: boolean;
  isCreatingEvent: boolean;
  isBookingEvent: boolean;
  isFetchingEvents: boolean;
  selectedEventForBooking: IEvent;
}
