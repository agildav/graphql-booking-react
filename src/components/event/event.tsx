import React, { SyntheticEvent } from "react";
import { IEventProps, IEventState, IEventInput } from "./event.model";
import { INavigationState } from "../navigation/mainNavBar.model";
import { CustomModalDialog } from "../../shared/components/modal.component";
import { CustomInputTextField } from "../../shared/components/input.component";
import { HTMLElementEvent } from "../../shared/adapter.model";
import { CustomDateTimePicker } from "../../shared/components/date-time-picker.component";

import "./event.css";

/** Event component */
class Event extends React.Component<IEventProps, IEventState> {
  initialState: IEventState = {
    events: [],
    createEventInput: {
      date: new Date().toISOString(),
      description: "",
      price: 0,
      title: ""
    }
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

  onTitleInputChange = (event: SyntheticEvent) => {
    event.persist();

    const target: HTMLElementEvent = event.target;

    this.setState((state: IEventState) => {
      return {
        createEventInput: {
          ...state.createEventInput,
          title: target.value
        }
      };
    });
  };

  onPriceInputChange = (event: SyntheticEvent) => {
    event.persist();

    const target: HTMLElementEvent = event.target;

    this.setState((state: IEventState) => {
      return {
        createEventInput: {
          ...state.createEventInput,
          price: target.value
        }
      };
    });
  };

  onDescriptionInputChange = (event: SyntheticEvent) => {
    event.persist();

    const target: HTMLElementEvent = event.target;

    this.setState((state: IEventState) => {
      return {
        createEventInput: {
          ...state.createEventInput,
          description: target.value
        }
      };
    });
  };

  /** receives a parsable date from the date picker component */
  onDateInputChange = (date: string | any) => {
    this.setState(
      (state: IEventState) => {
        return {
          createEventInput: {
            ...state.createEventInput,
            date: new Date(date).toISOString()
          }
        };
      },
      () => console.log(this.state)
    );
  };

  /** checks if the event creation inputs are valid */
  isValidUserInput(userInput: IEventInput): boolean {
    const { date, description, price, title } = userInput;
    if (
      date.length < 1 ||
      description.length < 1 ||
      price < 0 ||
      title.length < 1
    ) {
      return false;
    }
    return true;
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
                <CustomDateTimePicker
                  value={this.state.createEventInput.date}
                  margin="normal"
                  label="Date"
                  inputVariant="outlined"
                  onChange={this.onDateInputChange}
                />
              </div>

              <div className="form-control">
                <CustomInputTextField
                  maxLength={140}
                  autoComplete="off"
                  // onChange={this.onEmailInputChange}
                  label="Description"
                  type="text"
                  name="description"
                  id="event-description"
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={2}
                  rowsMax={4}
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
