import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavbar from "../components/navigation/mainNavBar";
import Auth from "../components/auth/auth";
import Event from "../components/event/event";
import Booking from "../components/booking/booking";
import { Toastify } from "../components/toastify/toastify";
import { IAppState } from "./App.model";
import { IAuth } from "../components/auth/auth.model";

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

  /** Handles switching between register and login */
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

  authUser = async (auth: IAuth) => {
    await this.setState((state: IAppState) => {
      return {
        ...state,
        auth
      };
    });
  };

  render() {
    const isAuth: boolean = this.state.auth.token.length > 0;
    return (
      <BrowserRouter>
        <div id="App">
          <MainNavbar
            appState={this.state}
            switchRegisterLogin={this.switchAuthModeChange}
          />
          <main id="MainApp">
            <Toastify />
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    appState={this.state}
                    authUser={this.authUser}
                  />
                )}
              />

              {isAuth && (
                <React.Fragment>
                  <Route path="/events" component={Event} />
                  <Route path="/bookings" component={Booking} />
                </React.Fragment>
              )}

              <Redirect to="/auth" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
