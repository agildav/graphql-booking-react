import React from "react";
import { IEvent } from "../../../event.model";
import { Typography } from "@material-ui/core";
import { IAppState } from "../../../../../app/App.model";
import { CustomModalDialog } from "../../../../../shared/components/modal.component";

import "./eventItem.scss";

/** event item wrapped inside a list */
export const EventItem = (props: {
  event: IEvent;
  appState: IAppState;
  eventBooking: {
    isOpenEventBookingModal: boolean;
    closeEventModal: Function;
    openBookEventModal: Function;
    isBookingEvent: boolean;
    handleEventBooking: Function;
    selectedEventForBooking: IEvent;
  };
}) => {
  const { _id, price, title, date, creator } = props.event;
  const { userId } = props.appState.auth;
  const { selectedEventForBooking } = props.eventBooking;

  const handleOpenModal = () => {
    if (_id) {
      return props.eventBooking.openBookEventModal(_id);
    }
  };

  return (
    <li className="event-list-item">
      <div className="event-slim-info">
        <Typography className="event-title" variant="h6" color="textPrimary">
          {title}
        </Typography>
        <div className="slim-wrapper">
          <Typography
            className="event-price"
            variant="subtitle2"
            color="textSecondary"
          >
            ${price}
          </Typography>
          <Typography
            className="event-date"
            variant="subtitle2"
            color="textSecondary"
          >
            {new Date(date).toDateString()}
          </Typography>
        </div>
      </div>
      <div className="event-details">
        {userId !== creator._id ? (
          <div id="EventBookingButton">
            <CustomModalDialog
              isOpenModal={props.eventBooking.isOpenEventBookingModal}
              onCloseModal={props.eventBooking.closeEventModal}
              modalId="book-event-modal"
              modalTitle="Event details"
              canCancel
              canConfirm
              openModalButton={{
                color: "primary",
                size: "small",
                variant: "outlined",
                type: "button",
                title: "Details",
                onClick: handleOpenModal
              }}
              cancelModalButton={{
                color: "primary",
                size: "large",
                variant: "text",
                type: "button",
                title: "Cancel",
                onClick: props.eventBooking.closeEventModal
              }}
              confirmModalButton={{
                color: "primary",
                size: "large",
                variant: "text",
                type: "button",
                title: "Book",
                disabled: props.eventBooking.isBookingEvent,
                onClick: props.eventBooking.handleEventBooking
              }}
            >
              {/* Modal content */}
              <div className="book-event-section">
                <div>
                  <Typography variant="h6" color="primary">
                    Title:
                  </Typography>
                  <Typography variant="subtitle2">
                    {selectedEventForBooking.title}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary">
                    Created at:
                  </Typography>
                  <Typography variant="subtitle2">
                    {new Date(selectedEventForBooking.createdAt).toDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary">
                    Description
                  </Typography>
                  <Typography variant="subtitle2">
                    {selectedEventForBooking.description}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary">
                    Date:
                  </Typography>
                  <Typography variant="subtitle2">
                    {new Date(selectedEventForBooking.date).toDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary">
                    Price:
                  </Typography>
                  <Typography variant="subtitle2">
                    ${selectedEventForBooking.price}
                  </Typography>
                </div>
              </div>
            </CustomModalDialog>
          </div>
        ) : (
          <Typography variant="overline">You're the owner</Typography>
        )}
      </div>
    </li>
  );
};
