import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData, EventError } from "../../app/models/event";
import { RootState } from "../../app/store";
import { validateName } from "../../utils/utils";

const initialState = {
  event: new EventData({}),
  errorEvent: new EventError({}),
  canSubmit: false,
  termsAccepted: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeData: (state, action: PayloadAction<any>) => {
      const eventObj = Object.assign({}, state.event);
      const eventErr = Object.assign({}, state.errorEvent);

      switch (action.payload.type) {
        case "name":
          const activeUser = JSON.parse(localStorage.getItem("activeUser") || "");
          eventObj.name = action.payload.value;
          eventObj.user = activeUser;
          eventErr.name = !validateName(action.payload.value);
          break;
        case "date":
          eventObj.date = action.payload.value;
          break;
        case "price":
          eventObj.price = action.payload.value;
          break;
        case "description":
          eventObj.description = action.payload.value;
          eventErr.description = !validateName(action.payload.value);
          break;
        case "type":
          eventObj.type = action.payload.value;
          break;
        case "termsAccepted":
          state.termsAccepted = action.payload.value;
          break;
      }

      state.event = eventObj;
      state.errorEvent = eventErr;
    },
    getEvent: (state, action: PayloadAction<string>) => {
      const eventList = JSON.parse(localStorage.getItem("event") || "[]") || [];
      if (action.payload && eventList.length > 0) {
        const foundIndex = eventList.findIndex((x: any) => x.id === parseInt(action.payload, 10));
        state.event = eventList[foundIndex];
      }
    },
    
    submitEvent: (state, action: PayloadAction<string | undefined>) => {
      
      const eventList = JSON.parse(localStorage.getItem("event") || "[]") || [];
      if (action.payload) {
        const foundIndex = eventList.findIndex((x: any) => x.id === parseInt(action.payload as string, 10));
        console.log(foundIndex);
        eventList[foundIndex] = state.event;
        localStorage.setItem("event", JSON.stringify(eventList));
      } else {
        eventList.push(state.event);
        localStorage.setItem("event", JSON.stringify(eventList));
      }
      window.location.pathname = "/events/";
    },
    deleteEvent:(state, action: PayloadAction<string | undefined>)=>{
      const eventList = JSON.parse(localStorage.getItem("event") || "[]") || [];
      if (action.payload) {
        const foundIndex = eventList.findIndex((x: any) => x.id === parseInt(action.payload as string, 10));
        console.log(foundIndex);
        eventList.splice(foundIndex, 1)
        localStorage.setItem("event", JSON.stringify(eventList));
      }
      window.location.pathname = "/events/";
    },
    submitCheck: (state) => {
      const errEvent = Object.assign({}, state.errorEvent);
      errEvent.name = !validateName(state.event.name);
      errEvent.description = !validateName(state.event.description);
      errEvent.date = !state.event.date;
      errEvent.type = !state.event.type;
      errEvent.price = state.event.price < 0;
      errEvent.termsAccepted = !state.termsAccepted;
      state.errorEvent = errEvent;
      state.canSubmit = !Object.values(errEvent).includes(true);
    },
  },
});

export const { changeData, submitEvent, submitCheck, getEvent, deleteEvent } = eventSlice.actions;

export const eventData = (state: RootState) => state.event.event;
export const eventErr = (state: RootState) => state.event.errorEvent;
export const canSubmit = (state: RootState) => state.event.canSubmit;

export default eventSlice.reducer;
