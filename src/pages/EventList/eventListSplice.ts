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
      const activeUser = JSON.parse(localStorage.getItem("activeUser") || "");
      const eventList = JSON.parse(localStorage.getItem("event") || "[]") || [];
      const data = eventList.filter((x: any) => x.user === activeUser);
      state.eventList = data;
    },
  },
});

export const { getEvents } = eventListSlice.actions;

export const events = (state: RootState) => state.eventList.eventList;

export default eventListSlice.reducer;