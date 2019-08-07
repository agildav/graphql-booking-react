import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Auth from "../components/auth/auth";
import Event from "../components/event/event";
import Booking from "../components/booking/booking";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={Event} />
          <Route path="/bookings" component={Booking} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
