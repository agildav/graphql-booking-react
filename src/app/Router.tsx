import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Toastify } from "../components/toastify/toastify";
import Booking from "../components/booking/booking";
import Event from "../components/event/event";
import { IAppState } from "./App.model";
import Auth from "../components/auth/auth";

/** Props received by main app */
interface IRouterProps {
  appState: IAppState;
  authUser: Function;
  updateNavigation: Function;
}

/** Router state */
interface IRouter {}

/** Router component */
class Router extends React.Component<IRouterProps, IRouter> {
  initialState: IRouter = {};

  constructor(props: IRouterProps) {
    super(props);

    this.state = this.initialState;
  }

  render() {
    const isAuth = this.props.appState.auth.token.length > 0;

    return (
      <main id="MainApp">
        <Toastify />
        <Switch>
          {!isAuth && <Redirect from="/" to="/auth" exact />}
          {isAuth && <Redirect from="/" to="/events" exact />}
          {isAuth && <Redirect from="/auth" to="/events" exact />}
          {!isAuth && (
            <Route
              path="/auth"
              render={props => (
                <Auth
                  {...props}
                  appState={this.props.appState}
                  authUser={this.props.authUser}
                />
              )}
            />
          )}

          {isAuth && (
            <React.Fragment>
              <Route
                path="/events"
                render={props => (
                  <Event
                    {...props}
                    appState={this.props.appState}
                    updateNavigation={this.props.updateNavigation}
                  />
                )}
              />
              <Route
                path="/bookings"
                render={props => (
                  <Booking
                    {...props}
                    appState={this.props.appState}
                    updateNavigation={this.props.updateNavigation}
                  />
                )}
              />
            </React.Fragment>
          )}

          <Redirect to="/auth" />
        </Switch>
      </main>
    );
  }
}

export default Router;
