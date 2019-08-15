import { IEvent } from "../event/event.model";
import { IAuthInput } from "../auth/auth.model";

/** Properties received by user */
export interface IUserInput extends IAuthInput {
  username?: string;
}

/** User model */
export interface IUser extends IUserInput {
  _id: string;
  createdAt: string;
  createdEvents: IEvent[];
}

/** User state */
export interface IUserState extends IUser {}
