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

/** Auth model */
export interface IAuth extends IAuthInput {
  userId: string;
  token: string;
  tokenExpiration?: string;
}

/** Auth state */
export interface IAuthState extends IAuth {
  isHandlingAuth: boolean;
  isLoggingWithToken: boolean;
}
