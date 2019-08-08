import { IUser } from "../user/user.model";

/** Properties received by user */
export interface IEventInput {
  title: string;
  description: string;
  price: number;
}

/** Event model */
export interface IEvent extends IEventInput {
  _id: any;
  date: string;
  creator: IUser | string;
}
