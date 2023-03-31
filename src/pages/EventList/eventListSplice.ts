import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  eventList: [],
};

export const eventListSlice = createSlice({
  name: "eventList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getEvents: (state) => {
      
      const eventList = JSON.parse(localStorage.getItem("event") || "[]") || [];
      state.eventList = eventList;
      
    },
  },
});

export const { getEvents } = eventListSlice.actions;

export const events = (state: RootState) => state.eventList.eventList;

export default eventListSlice.reducer;
