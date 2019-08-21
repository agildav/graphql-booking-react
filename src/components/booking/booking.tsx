import React from "react";
import { IBookingProps, IBookingState, IBooking } from "./booking.model";
import { INavigationState } from "../navigation/mainNavBar.model";
import FetchService from "../../shared/fetch.service";
import { toast } from "react-toastify";
import { CustomSpinner } from "../../shared/components/spinner.component";
import { Fade, Typography } from "@material-ui/core";
import { BookingList } from "./subcomponents/bookingList";

import "./booking.scss";
import { IEvent } from "../event/event.model";

/** Booking component */
class Booking extends React.Component<IBookingProps, IBookingState> {
  initialState: IBookingState = {
    bookings: [],
    isFetchingBookings: false,
    isCancelingBooking: false
  };

  constructor(props: IBookingProps) {
    super(props);

    this.state = this.initialState;
  }

  componentDidMount() {
    const currentNavigation: INavigationState = {
      isAtBookings: true,
      isAtEvents: false,
      isAtLogin: false,
      isAtRegister: false,
      isAtUsers: false
    };

    this.props.updateNavigation(currentNavigation);

    return this.fetchBookings();
  }

  /** finds all the bookings */
  fetchBookings = () => {
    this.setState(
      (state: IBookingState) => {
        return {
          isFetchingBookings: true
        };
      },
      async () => {
        const wantedFields = `
      {
        _id
        createdAt
        updatedAt
        event {
          _id
          title
          price
          date
        }
        user {
          _id
        }
      }
      `;

        const requestBody = {
          query: `
        query {
          bookings ${wantedFields}
        }
        `
        };

        try {
          const token = this.props.appState.auth.token;
          const response = await FetchService.fetchServer(requestBody, token);

          if (response.errors) {
            toast.error("An error occured fetching bookings");

            return this.setState((state: IBookingState) => {
              return {
                isFetchingBookings: false
              };
            });
          }

          const bookingsObj: { bookings: IBooking[] } = response.data;

          if (!bookingsObj) {
            throw new Error("An error occurred while fetching bookings");
          }

          return this.setState((state: IBookingState) => {
            return {
              isFetchingBookings: false,
              bookings: bookingsObj.bookings
            };
          });
        } catch (error) {
          toast.error("Sorry, could not fetch bookings");

          return this.setState((state: IBookingState) => {
            return {
              isFetchingBookings: false
            };
          });
        }
      }
    );
  };

  /** cancels a booking */
  cancelBooking = (bookingId: string) => {
    this.setState(
      (state: IBookingState) => {
        return {
          isCancelingBooking: true
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
          cancelBooking(bookingId: "${bookingId}")
          ${wantedFields}
        }
        `
        };

        try {
          const token = this.props.appState.auth.token;
          const response = await FetchService.fetchServer(requestBody, token);

          if (response.errors) {
            toast.error("An error occured cancelling booking");

            return this.setState((state: IBookingState) => {
              return {
                isCancelingBooking: false
              };
            });
          }

          const eventObj: { cancelBooking: IEvent } = response.data;

          if (!eventObj) {
            throw new Error("An error occurred while cancelling booking");
          }

          toast.success("Booking cancelled!");

          return this.setState((state: IBookingState) => {
            const updatedBookings = this.state.bookings.filter(
              booking => booking._id !== bookingId
            );

            return {
              isCancelingBooking: false,
              bookings: updatedBookings
            };
          });
        } catch (error) {
          toast.error("Sorry, could not cancel booking");

          return this.setState((state: IBookingState) => {
            return {
              isCancelingBooking: false
            };
          });
        }
      }
    );
  };

  render() {
    const showBookingsTransition: number = 1000;

    return (
      <div id="Bookings">
        {this.state.isFetchingBookings ? (
          <div className="bookings-spinner">
            <CustomSpinner variant="indeterminate" />
          </div>
        ) : (
          <Fade
            timeout={showBookingsTransition}
            in={!this.state.isFetchingBookings}
          >
            <main className="bookings-list">
              {this.state.bookings.length <= 0 ? (
                <Typography variant="overline" color="textSecondary">
                  You have no bookings
                </Typography>
              ) : (
                <BookingList
                  bookings={this.state.bookings}
                  cancelBooking={this.cancelBooking}
                  isCancelingBooking={this.state.isCancelingBooking}
                />
              )}
            </main>
          </Fade>
        )}
      </div>
    );
  }
}

export default Booking;
