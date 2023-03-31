import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IEvent } from "../../app/models/event";
import { deleteEvent } from "../Event/eventSplice";
import "./EventList.scss";
import { events, getEvents } from "./eventListSplice";

const EventList = () => {
  const navigate = useNavigate();
  const eventList = useAppSelector(events);
  //console.log(eventList);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getEvents());
  }, []);

  const navigateToEvent = (id?: number) => {
    if (!id) {
      navigate("/events/add");
    } else {
      navigate(`/events/${id}`);
    }
  };
  function handleDeleteEvent(id: any) {
    dispatch(deleteEvent(id));
  }

  function getTotal() {
    let totalPrice = 0;
    for (let i = 0; i < eventList.length; i++) {
      totalPrice += parseInt(eventList[i]["price"]);

    }
    return totalPrice;
  }
  return (
    <div className="eventlist">
      <div className="container">
        <div className="eventlist__header">
          <div className="eventlist__header-left">
            <h1 className="title">Events ({
              eventList && eventList.length
            })</h1>
            <span>Total price:&#8377; {getTotal()}</span>
          </div>

          <button className="eventlist__header-button" onClick={() => navigateToEvent()}>
            Add Event
          </button>
        </div>
        <div className="eventlist__block">
          {eventList &&
            eventList.length > 0 &&
            eventList.map((event: IEvent) => (
              <div className="eventlist__item">
                <div className="eventlist__item-img">
                  <img src={"../../../images/event-1.png"} alt="event"></img>
                  {event.type === "premium" && <span className="eventlist__item-premium">Premium</span>}
                </div>
                <div className="eventlist__body">
                  <h2 className="eventlist__item-title">{event.name}</h2>
                  <div className="eventlist__item-desc">{event.description}</div>
                  <div className="eventlist__item-group">
                    <div className="eventlist__item-price">&#8377; {event.price} </div>
                    <div className="eventlist__item-date">{event.date} </div>
                  </div>
                  <div className="eventlist__item-actions">
                    <div className="eventlist__item-edit" onClick={() => navigateToEvent(event.id)}>Edit</div>
                    <div className="eventlist__item-delete" onClick={handleDeleteEvent.bind(null, event.id)}> Delete </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
