import { IAppState } from "../../app/App.model";

/** Props received by main App */
export interface IAuthProps {
  appState: IAppState;
  authUser: Function;
}

/** Auth input required by user */
export interface IAuthInput {
  email: string;
  password: string;
}

/** Auth state */
export interface IAuth extends IAuthInput {
  userId: string;
  token: string;
  tokenExpiration: string;
}

/** Adapter between HTML elements and events with EventTarget */
export interface HTMLElementEvent extends EventTarget {
  target?: HTMLElement;
  value?: any;
}
