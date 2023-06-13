import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id?: string | null;
  status?: string | null;
  animation?: string | null;
  title?: string | null;
  body?: string | null;
  redirectUrl?: string | null;
}
export const eventSlice = createSlice({
  name: "event",
  initialState: {
    id: null,
    status: null,
    animation: null,
    title: null,
    body: null,
    redirectUrl: null,
  } as Event,
  reducers: {
    setEvent: (state, action: PayloadAction<Event>) => {
      state.id = action.payload.id;
      state.animation = action.payload.animation;
      state.body = action.payload.body;
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.redirectUrl = action.payload.redirectUrl;
    },
    clearEvent: (state) => {
      state.id = null;
      state.animation = null;
      state.body = null;
      state.status = null;
      state.title = null;
      state.redirectUrl = null;
    },
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
