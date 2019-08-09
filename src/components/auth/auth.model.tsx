import { IUser } from "../user/user.model";
import { IAppState } from "../../app/App.model";

export interface IAuthProps {
  appState: IAppState;
}

export interface IAuthState extends IUser {
  userId?: string;
  token: string;
  tokenExpiration: string;
}

export interface HTMLElementEvent extends EventTarget {
  target?: HTMLElement;
  value?: any;
}
