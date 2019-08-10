import { IAuth } from "../components/auth/auth.model";
import { INavigation } from "../components/navigation/mainNavBar.model";

/** Global main App state */
export interface IAppState {
  navigation: INavigation;
  auth: IAuth;
}
