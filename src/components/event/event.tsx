import React from "react";
import { IEventProps, IEventState } from "./event.model";
import { INavigationState } from "../navigation/mainNavBar.model";
import { CustomModalDialog } from "../../shared/components/modal.component";
import { CustomInputTextField } from "../../shared/components/input.component";
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
    ],
    isCreatingEvent: false
  };

  constructor(props: IEventProps) {
    super(props);

    this.state = this.initialState;
  }

  componentDidMount() {
    const currentNavigation: INavigationState = {
      isAtBookings: false,
      isAtEvents: true,
      isAtLogin: false,
      isAtRegister: false,
      isAtUsers: false
    };

    this.props.updateNavigation(currentNavigation);
  }

  render() {
    return (
      <React.Fragment>
        <div id="EventsControlButton">
          <CustomModalDialog
            modalId="create-event-modal"
            modalTitle="Create a new event!"
            canCancel
            canConfirm
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
              variant: "text",
              type: "button",
              title: "Cancel"
            }}
            confirmModalButton={{
              color: "primary",
              size: "large",
              variant: "text",
              type: "button",
              title: "Create"
            }}
          >
            <div className="create-event-form">
              <div className="form-control">
                <CustomInputTextField
                  maxLength={140}
                  autoComplete="off"
                  // onChange={this.onEmailInputChange}
                  label="Name"
                  type="text"
                  name="name"
                  id="event-name"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="form-control">
                <CustomInputTextField
                  maxLength={140}
                  autoComplete="off"
                  // onChange={this.onEmailInputChange}
                  label="Price"
                  type="number"
                  name="price"
                  id="event-price"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="form-control">
                <CustomInputTextField
                  maxLength={140}
                  autoComplete="off"
                  // onChange={this.onEmailInputChange}
                  label="Description"
                  type="textarea"
                  name="description"
                  id="event-description"
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>
          </CustomModalDialog>
        </div>
      </React.Fragment>
    );
  }
}

export default Event;
