import { IUser } from "../user/user.model";

export interface IAuthProps {}

export interface IAuthState extends IUser {}

export interface HTMLElementEvent extends EventTarget {
  target?: HTMLElement;
  value?: any;
}
