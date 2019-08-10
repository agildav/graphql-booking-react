import { IAppState } from "../../app/App.model";

/** Props received by main App */
export interface IMainNavBarProps {
  appState: IAppState;
  switchRegisterLogin: Function;
  logout: Function;
}

export interface INavigation {
  isAtLogin: boolean;
  isAtRegister: boolean;
  isAtEvents: boolean;
  isAtBookings: boolean;
  isAtUsers: boolean;
}
