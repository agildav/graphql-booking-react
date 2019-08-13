import React, { SyntheticEvent } from "react";
import { IEventProps, IEventState, IEventInput, IEvent } from "./event.model";
import { INavigationState } from "../navigation/mainNavBar.model";
import { CustomModalDialog } from "../../shared/components/modal.component";
import { CustomInputTextField } from "../../shared/components/input.component";
import { HTMLElementEvent } from "../../shared/adapter.model";
import { CustomDateTimePicker } from "../../shared/components/date-time-picker.component";
import { toast } from "react-toastify";
import FetchService from "../../shared/fetch.service";

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
    },
    isOpenModal: false,
    isCreatingEvent: false
  };

  constructor(props: IEventProps) {
    super(props);

    this.state = this.initialState;
  }

  /** Re-starts the state */
  initState = () => {
    this.setState((state: IEventState) => {
      return this.initialState;
    });
  };

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
    this.setState((state: IEventState) => {
      return {
        createEventInput: {
          ...state.createEventInput,
          date: new Date(date).toISOString()
        }
      };
    });
  };

  /** checks if the event creation inputs are valid */
  isValidEventInput(userInput: IEventInput): boolean {
    const { date, description, price, title } = userInput;
    if (
      date.length < 1 ||
      description.length < 1 ||
      price <= 0 ||
      title.length < 1
    ) {
      return false;
    }
    return true;
  }

  /** creates a new event */
  createEvent = async (eventInput: IEventInput) => {
    const wantedFields = `
    {
      _id
    }
    `;

    const requestBody = {
      query: `
      mutation {
        createEvent(eventInput: {title: "${eventInput.title}", price: ${eventInput.price}, description: "${eventInput.description}", date: "${eventInput.date}"})
        ${wantedFields}
      }
      `
    };

    try {
      const token = this.props.appState.auth.token;
      const response = await FetchService.fetchServer(requestBody, token);

      if (response.errors) {
        toast.error("An error occured");

        return this.setState((state: IEventState) => {
          return {
            isCreatingEvent: false
          };
        });
      }

      const event: { createEvent: IEvent } = response.data;
      if (!event) {
        throw new Error("An error occurred while creating event");
      }

      toast.success("Event created!");

      return this.closeCreateEventModal();
    } catch (error) {
      toast.error("Sorry, could not create event");

      throw error;
    }
  };

  /** handles the event creation on confirm */
  handleEventCreation = async () => {
    this.setState(
      (state: IEventState) => {
        return {
          isCreatingEvent: true
        };
      },
      async () => {
        // sanitize
        const eventInput: IEventInput = {
          date: this.state.createEventInput.date.trim(),
          description: this.state.createEventInput.description.trim(),
          price: this.state.createEventInput.price,
          title: this.state.createEventInput.title.trim()
        };

        try {
          const valid = this.isValidEventInput(eventInput);

          if (!valid) {
            throw new Error("invalid event input");
          }
        } catch (error) {
          toast.error("Invalid data");

          return this.setState((state: IEventState) => {
            return {
              isCreatingEvent: false
            };
          });
        }

        try {
          await this.createEvent(eventInput);
          return;
        } catch (error) {
          return this.setState((state: IEventState) => {
            return {
              isCreatingEvent: false
            };
          });
        }
      }
    );
  };

  /** opens the modal */
  openCreateEventModal = () => {
    return this.setState((state: IEventState) => {
      return {
        isOpenModal: true
      };
    });
  };

  /** handles the on close and cancel events */
  closeCreateEventModal = () => {
    return this.setState((state: IEventState) => {
      return {
        isCreatingEvent: false,
        isOpenModal: false,
        createEventInput: {
          date: new Date().toISOString(),
          description: "",
          price: 0,
          title: ""
        }
      };
    });
  };

  render() {
    return (
      <div id="EventsControlButton">
        <CustomModalDialog
          isOpenModal={this.state.isOpenModal}
          onCloseModal={this.closeCreateEventModal}
          modalId="create-event-modal"
          modalTitle="Event creation"
          canCancel
          canConfirm
          openModalButton={{
            color: "primary",
            size: "large",
            variant: "contained",
            type: "button",
            title: "Create event",
            onClick: this.openCreateEventModal
          }}
          cancelModalButton={{
            color: "primary",
            size: "large",
            variant: "text",
            type: "button",
            title: "Cancel",
            onClick: this.closeCreateEventModal
          }}
          confirmModalButton={{
            color: "primary",
            size: "large",
            variant: "text",
            type: "button",
            title: "Create",
            disabled: this.state.isCreatingEvent,
            onClick: this.handleEventCreation
          }}
        >
          <div className="create-event-form">
            <div className="form-control">
              <CustomInputTextField
                maxLength={140}
                autoComplete="off"
                onChange={this.onTitleInputChange}
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
                onChange={this.onPriceInputChange}
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
                onChange={this.onDescriptionInputChange}
                label="Description"
                type="text"
                name="description"
                id="event-description"
                margin="normal"
                variant="outlined"
                multiline
                rows={1}
              />
            </div>
          </div>
        </CustomModalDialog>
      </div>
    );
  }
}

export default Event;
