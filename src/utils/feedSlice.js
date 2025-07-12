import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => action.payload,
    addFeed: () => null,
  },
});

export const { setFeed, addFeed } = feedSlice.actions;

export default feedSlice.reducer;
