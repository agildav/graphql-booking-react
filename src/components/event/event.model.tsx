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
  _id: any;
  createdAt: string;
  creator: IUser | string;
}

/** Event state */
export interface IEventState {
  events: IEvent[];
  createEventInput: IEventInput;
}
