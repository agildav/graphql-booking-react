import React from "react";
import { IBookingProps, IBookingState, IBooking } from "./booking.model";
import { INavigationState } from "../navigation/mainNavBar.model";
import FetchService from "../../shared/fetch.service";
import { toast } from "react-toastify";
import { CustomSpinner } from "../../shared/components/spinner.component";
import { Fade, Typography } from "@material-ui/core";

import "./booking.scss";

/** Booking component */
class Booking extends React.Component<IBookingProps, IBookingState> {
  initialState: IBookingState = {
    bookings: [],
    isFetchingBookings: false
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
        event {
          _id
          title
          price
        }
        user {
          _id
        }
        updatedAt
        createdAt
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

            return;
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
                <ul>
                  {this.state.bookings.map(booking => {
                    return (
                      <li key={booking._id}>
                        <div>
                          Booking created on:{" "}
                          {new Date(booking.createdAt).toDateString()}
                        </div>
                        <div>Event ID: {booking.event._id}</div>
                        <div>Title: {booking.event.title}</div>
                        <div>Price: ${booking.event.price}</div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </main>
          </Fade>
        )}
      </div>
    );
  }
}

export default Booking;
