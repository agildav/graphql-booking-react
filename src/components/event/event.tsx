import React from "react";
import { IEventProps, IEventState } from "./event.model";
import { INavigation } from "../navigation/mainNavBar.model";
import { CustomModalDialog } from "../../shared/components/modal.component";
import "./event.css";

/** Event component */
class Event extends React.Component<IEventProps, IEventState> {
  initialState: IEventState = {
    events: [
      {
        _id: "",
        creator: "",
        date: "",
        description: "",
        price: 0,
        title: ""
      }
    ]
  };

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
    return (
      <React.Fragment>
        <div id="EventsControl">
          <CustomModalDialog
            modalId="create-event-modal"
            modalTitle="Create a new event!"
            canCancel={true}
            canConfirm={true}
            openModalButton={{
              color: "primary",
              size: "large",
              variant: "contained",
              type: "button",
              title: "Create event"
            }}
            cancelModalButton={{
              color: "primary",
              size: "large",
              variant: "contained",
              type: "button",
              title: "Cancel"
            }}
            confirmModalButton={{
              color: "primary",
              size: "large",
              variant: "contained",
              type: "button",
              title: "Create"
            }}
          >
            <p>ola k ase</p>
          </CustomModalDialog>
        </div>
      </React.Fragment>
    );
  }
}

export default Event;
