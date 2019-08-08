import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavbar from "../components/navigation/mainNavBar";
import Auth from "../components/auth/auth";
import Event from "../components/event/event";
import Booking from "../components/booking/booking";
import { Toastify } from "../components/toastify/toastify";

import "./App.css";

/** Application's root component */
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App">
          <MainNavbar />
          <main id="MainApp">
            <Toastify />
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={Auth} />
              <Route path="/events" component={Event} />
              <Route path="/bookings" component={Booking} />
              <Redirect to="/auth" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
