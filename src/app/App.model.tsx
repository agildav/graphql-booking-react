import { IAuthState } from "../components/auth/auth.model";
import { INavigationState } from "../components/navigation/mainNavBar.model";

/** Global main App state */
export interface IAppState {
  navigation: INavigationState;
  auth: IAuthState;
}
