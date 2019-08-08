import { IEvent } from "../event/event.model";

/** Properties received by user */
export interface IUserInput {
  email: string;
  password: string;
  username?: string;
}

/** User model */
export interface IUser extends IUserInput {
  _id: any;
  createdAt: string;
  createdEvents: IEvent[] | string[];
}
