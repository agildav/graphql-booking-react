import React, { SyntheticEvent } from "react";
import { IEventProps, IEventState, IEventInput, IEvent } from "./event.model";
import { INavigationState } from "../navigation/mainNavBar.model";
import { CustomModalDialog } from "../../shared/components/modal.component";
import { CustomInputTextField } from "../../shared/components/input.component";
import { HTMLElementEvent } from "../../shared/adapter.model";
import { CustomDateTimePicker } from "../../shared/components/date-time-picker.component";
import { toast } from "react-toastify";
import { Typography, Fade } from "@material-ui/core";
import FetchService from "../../shared/fetch.service";
import { EventList } from "./subcomponents/eventList/eventList";
import { CustomSpinner } from "../../shared/components/spinner.component";
import { IBooking } from "../booking/booking.model";

import "./event.scss";

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
    selectedEventForBooking: {
      _id: "",
      createdAt: "",
      creator: {
        _id: "",
        createdAt: "",
        createdEvents: [],
        email: "",
        password: "",
        username: ""
      },
      date: "",
      description: "",
      price: 0,
      title: ""
    },
    isOpenEventCreationModal: false,
    isOpenEventBookingModal: false,
    isCreatingEvent: false,
    isBookingEvent: false,
    isFetchingEvents: false
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

    return this.fetchEvents();
  }

  /** finds all the events */
  fetchEvents = () => {
    this.setState(
      (state: IEventState) => {
        return {
          isFetchingEvents: true
        };
      },
      async () => {
        const wantedFields = `
      {
        _id
        title
        price
        date
        createdAt
        description
        creator {
          _id
        }
      }
      `;

        const requestBody = {
          query: `
        query {
          events ${wantedFields}
        }
        `
        };

        try {
          const token = this.props.appState.auth.token;
          const response = await FetchService.fetchServer(requestBody, token);

          if (response.errors) {
            toast.error("An error occured fetching events");

            return;
          }

          const eventsObj: { events: IEvent[] } = response.data;

          if (!eventsObj) {
            throw new Error("An error occurred while fetching events");
          }

          return this.setState((state: IEventState) => {
            return {
              isFetchingEvents: false,
              events: eventsObj.events
            };
          });
        } catch (error) {
          toast.error("Sorry, could not fetch events");

          return this.setState((state: IEventState) => {
            return {
              isFetchingEvents: false
            };
          });
        }
      }
    );
  };

  /** updates the event input */
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

  /** updates the event input */
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

  /** updates the event input */
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
      title
      price
      date
      createdAt
      description
      creator {
        _id
      }
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

      return this.setState((state: IEventState) => {
        const updatedEvents = [...state.events];

        updatedEvents.push(event.createEvent);

        return {
          events: updatedEvents,
          isCreatingEvent: false,
          isOpenEventCreationModal: false,
          createEventInput: {
            date: new Date().toISOString(),
            description: "",
            price: 0,
            title: ""
          }
        };
      });
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

  /** opens the create event modal */
  openCreateEventModal = () => {
    return this.setState((state: IEventState) => {
      return {
        isOpenEventCreationModal: true
      };
    });
  };

  /** handles the on close and cancel events of all modals */
  closeEventModal = () => {
    return this.setState((state: IEventState) => {
      return {
        isCreatingEvent: false,
        isBookingEvent: false,
        isOpenEventCreationModal: false,
        isOpenEventBookingModal: false,
        createEventInput: {
          date: new Date().toISOString(),
          description: "",
          price: 0,
          title: ""
        }
      };
    });
  };

  /** opens the booking modal */
  openBookEventModal = (eventId: string) => {
    const selectedEvent = this.state.events.find(e => e._id === eventId);

    if (selectedEvent) {
      return this.setState((state: IEventState) => {
        return {
          isOpenEventBookingModal: true,
          selectedEventForBooking: selectedEvent
        };
      });
    } else {
      toast.error("Sorry, an error occurred fetching event details");
      return;
    }
  };

  /** books an event */
  handleEventBooking = () => {
    this.setState(
      (state: IEventState) => {
        return {
          isBookingEvent: true
        };
      },
      async () => {
        const wantedFields = `
        {
          _id
        }
        `;

        const requestBody = {
          query: `
          mutation {
            bookEvent(eventId: "${this.state.selectedEventForBooking._id}")
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
                isBookingEvent: false
              };
            });
          }

          const booking: { bookEvent: IBooking } = response.data;
          if (!booking) {
            throw new Error("An error occurred while booking event");
          }

          toast.success("Event booking done!");

          return this.setState((state: IEventState) => {
            return {
              isOpenEventBookingModal: false,
              isBookingEvent: false
            };
          });
        } catch (error) {
          toast.error("Sorry, could not book event");

          this.setState((state: IEventState) => {
            return {
              isBookingEvent: false
            };
          });
        }
      }
    );
  };

  render() {
    const showEventsTransition: number = 1000;

    return (
      <div id="Events">
        {/* Event creation */}
        <div id="EventCreationButton">
          <CustomModalDialog
            isOpenModal={this.state.isOpenEventCreationModal}
            onCloseModal={this.closeEventModal}
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
              onClick: this.closeEventModal
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
                  maxLength={40}
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

        {/* Events list */}
        {this.state.isFetchingEvents ? (
          <div className="events-spinner">
            <CustomSpinner variant="indeterminate" />
          </div>
        ) : (
          <Fade
            timeout={showEventsTransition}
            in={!this.state.isFetchingEvents}
          >
            <main className="events-list">
              {this.state.events.length <= 0 ? (
                <Typography variant="overline" color="textSecondary">
                  There are no events
                </Typography>
              ) : (
                <EventList
                  events={this.state.events}
                  appState={this.props.appState}
                  eventBookings={{
                    closeEventModal: this.closeEventModal,
                    handleEventBooking: this.handleEventBooking,
                    isBookingEvent: this.state.isBookingEvent,
                    isOpenEventBookingModal: this.state.isOpenEventBookingModal,
                    openBookEventModal: this.openBookEventModal,
                    selectedEventForBooking: this.state.selectedEventForBooking
                  }}
                />
              )}
            </main>
          </Fade>
        )}
      </div>
    );
  }
}

export default Event;
