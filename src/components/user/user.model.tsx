import { IEvent } from "../event/event.model";
import { IAuthInput } from "../auth/auth.model";

/** Properties received by user */
export interface IUserInput extends IAuthInput {
  username?: string;
}

/** User model */
export interface IUser extends IUserInput {
  _id: any;
  createdAt: string;
  createdEvents: IEvent[] | string[];
}
