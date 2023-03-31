import React from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeData,
  eventData,
  submitCheck,
  canSubmit,
  submitEvent,
  eventErr,
  getEvent,
} from "./eventSplice";

import "./Event.scss";

const Event = () => {
  const event = useAppSelector(eventData);
  const canSubmitForm = useAppSelector(canSubmit);
  const errorEvnt = useAppSelector(eventErr);
  const dispatch = useAppDispatch();
  const { eventId } = useParams();

  React.useEffect(() => {
    if (canSubmitForm) {
      dispatch(submitEvent(eventId));
    }
  }, [canSubmitForm]);

  React.useEffect(() => {
    if (eventId) {
      dispatch(getEvent(eventId));
    }
  }, [eventId]);

  return (
    <div className="event">
      <div className="event__block">
        <h1 className="title"> Event</h1>
        <form
          className="form event__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(submitCheck());
          }}
        >
          <div className="form__group">
            <label htmlFor="eventName" className="form__label">
              Name
            </label>
            <input
              type="text"
              name="eventname"
              id="eventName"
              className="form__input"
              placeholder="Enter event name..."
              value={event.name}
              onChange={(e) =>
                dispatch(changeData({ type: "name", value: e.target.value }))
              }
            />
            {errorEvnt.name && (
              <div className="form__input-error">
                <p>Please enter the event name.</p>
              </div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="eventDate" className="form__label">
              Date
            </label>
            <input
              type="date"
              name="eventdate"
              id="eventDate"
              className="form__input"
              value={event.date}
              onChange={(e) =>
                dispatch(changeData({ type: "date", value: e.target.value }))
              }
            />
            {errorEvnt.date && (
              <div className="form__input-error">
                <p>Please enter the event date.</p>
              </div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="eventPrice" className="form__label">
              Price
            </label>
            <input
              className="form__input"
              type="number"
              name="eventprice"
              id="eventPrice"
              value={event.price}
              onChange={(e) =>
                dispatch(changeData({ type: "price", value: e.target.value }))
              }
            />
            {errorEvnt.price && (
              <div className="form__input-error">
                <p>Please enter the event price.</p>
              </div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="" className="form__label">
              Event Type
            </label>

            <div className="form__group-input">
              <input
                className="form__input form__input--radio"
                type="radio"
                name="bookingtype"
                id=""
                checked={event.type === "normal"}
                onChange={(e) =>
                  dispatch(changeData({ type: "type", value: "normal" }))
                }
              />
              Normal
              <input
                className="form__input form__input--radio"
                type="radio"
                name="bookingtype"
                id=""
                checked={event.type === "premium"}
                onChange={(e) =>
                  dispatch(changeData({ type: "type", value: "premium" }))
                }
              />
              Premium
              {errorEvnt.type && (
                <div className="form__input-error flex-100">
                  <p>Please choose the event type.</p>
                </div>
              )}
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="eventDescription" className="form__label">
              Description
            </label>
            <textarea
              className="form__input form__input--textarea"
              name="eventdescription"
              id="eventDescription"
              value={event.description}
              placeholder="Enter event  description here..."
              onChange={(e) =>
                dispatch(
                  changeData({ type: "description", value: e.target.value })
                )
              }
            ></textarea>
            {errorEvnt.description && (
              <div className="form__input-error">
                <p>Please enter the event description</p>
              </div>
            )}
          </div>

          <div className="form__group form__group--input">
            <input
              className="form__input form__input--checkbox"
              type="checkbox"
              name="termscondition"
              id=""
              onChange={(e) =>
                dispatch(
                  changeData({ type: "termsAccepted", value: e.target.checked })
                )
              }
            />
            <span>I accept terms & conditions</span>
            {errorEvnt.termsAccepted && (
              <div className="form__input-error flex-100">
                <p>Please accept terms & conditions</p>
              </div>
            )}
          </div>

          <div className="form__action">
            <input className="form__button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Event;
