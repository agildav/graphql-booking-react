import React from "react";
import { IEventProps, IEvent } from "./event.model";
import { INavigation } from "../navigation/mainNavBar.model";

/** Event component */
class Event extends React.Component<IEventProps, IEvent[]> {
  initialState: IEvent[] = [
    {
      _id: "",
      creator: "",
      date: "",
      description: "",
      price: 0,
      title: ""
    }
  ];

  constructor(props: IEventProps) {
    super(props);

    const currentNavigation: INavigation = {
      isAtEvents: true,
      isAtBookings: false,
      isAtLogin: false,
      isAtRegister: false,
      isAtUsers: false
    };

    this.props.updateNavigation(currentNavigation);

    this.state = this.initialState;
  }

  render() {
    return <h1>Event page</h1>;
  }
}

export default Event;
