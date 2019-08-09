import React from "react";
import MainNavbar from "../components/navigation/mainNavBar";
import { IAppState } from "./App.model";
import { IAuth } from "../components/auth/auth.model";
import { INavigation } from "../components/navigation/mainNavBar.model";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

import "./App.css";

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
      tokenExpiration: ""
    }
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = this.initialState;
  }

  /** Re-starts the state */
  initState = async () => {
    await this.setState((state: IAppState) => {
      return this.initialState;
    });
  };

  /** Handles switching between register and login (updates the navigation state) */
  switchAuthModeChange = async () => {
    await this.setState((state: IAppState) => {
      return {
        ...state,
        navigation: {
          ...state.navigation,
          isAtLogin: !state.navigation.isAtLogin,
          isAtRegister: !state.navigation.isAtRegister
        }
      };
    });
  };

  /** Updates the app auth state */
  authUser = async (auth: IAuth) => {
    await this.setState((state: IAppState) => {
      return {
        ...state,
        navigation: {
          ...state.navigation,
          isAtLogin: false,
          isAtRegister: false
        },
        auth
      };
    });
  };

  /** Updates the navigation location */
  updateNavigation = async (navigation: INavigation) => {
    await this.setState((state: IAppState) => {
      return {
        ...state,
        navigation
      };
    });
  };

  render() {
    return (
      <div id="App">
        <BrowserRouter>
          <MainNavbar
            appState={this.state}
            switchRegisterLogin={this.switchAuthModeChange}
          />
          <Router
            appState={this.state}
            authUser={this.authUser}
            updateNavigation={this.updateNavigation}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
