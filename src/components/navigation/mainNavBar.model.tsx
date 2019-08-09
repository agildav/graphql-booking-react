import { IAppState } from "../../app/App.model";

/** Props received by main App */
export interface IMainNavBarProps {
  appState: IAppState;
  switchRegisterLogin: Function;
}
