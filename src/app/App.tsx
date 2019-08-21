import React from "react";
import MainNavbar from "../components/navigation/mainNavBar";
import { IAppState } from "./App.model";
import { IAuthState } from "../components/auth/auth.model";
import { INavigationState } from "../components/navigation/mainNavBar.model";
import { HashRouter } from "react-router-dom";
import Router from "./Router";
import FetchService from "../shared/fetch.service";

import "./App.scss";

/** Application's root component */
class App extends React.Component<{}, IAppState> {
  initialState: IAppState = {
    navigation: {
      isAtLogin: true,
      isAtRegister: false,
      isAtBookings: false,
      isAtEvents: false,
      isAtUsers: false
    },
    auth: {
      email: "",
      password: "",
      userId: "",
      token: "",
      tokenExpiration: "",
      isHandlingAuth: false,
      isLoggingWithToken: false
    }
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = this.initialState;
  }

  /** Re-starts the state */
  initState = () => {
    this.setState((state: IAppState) => {
      return this.initialState;
    });
  };

  /** Handles switching between register and login (updates the navigation state) */
  switchAuthModeChange = () => {
    this.setState((state: IAppState) => {
      return {
        navigation: {
          ...state.navigation,
          isAtLogin: !state.navigation.isAtLogin,
          isAtRegister: !state.navigation.isAtRegister
        }
      };
    });
  };

  /** Updates the app auth state */
  authUser = (auth: IAuthState) => {
    this.setState((state: IAppState) => {
      return {
        navigation: {
          ...state.navigation,
          isAtLogin: false,
          isAtRegister: false
        },
        auth
      };
    });
  };

  removeAuthTokenInLocalStorage = () => {
    window.localStorage.removeItem("token");
  };

  logoutUser = async () => {
    const token = this.state.auth.token;
    this.removeAuthTokenInLocalStorage();
    this.setState(
      (state: IAppState) => {
        return this.initialState;
      },
      async () => {
        const wantedFields = `
        {
         userId
        }
        `;

        const requestBody = {
          query: `
          query {
            logout(tokenInput: {token: "${token}"})
            ${wantedFields}
          }
          `
        };

        try {
          await FetchService.fetchServer(requestBody);
          return;
        } catch (error) {
          console.log("an error occurred trying to logout", error);
          return;
        }
      }
    );
  };

  /** Updates the navigation location */
  updateNavigation = (navigation: INavigationState) => {
    this.setState((state: IAppState) => {
      return {
        navigation
      };
    });
  };

  render() {
    return (
      <div id="App">
        <HashRouter>
          <MainNavbar
            appState={this.state}
            switchRegisterLogin={this.switchAuthModeChange}
            logout={this.logoutUser}
          />
          <Router
            appState={this.state}
            authUser={this.authUser}
            updateNavigation={this.updateNavigation}
          />
        </HashRouter>
        {/* <button onClick={() => console.log(this.state)}></button> */}
      </div>
    );
  }
}

export default App;
