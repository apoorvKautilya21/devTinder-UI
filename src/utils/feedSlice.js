import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => action.payload,
    removeFeed: (state, action) =>
      state.filter((user) => user._id !== action.payload),
    removeAllFeed: () => null,
  },
});

export const { setFeed, removeFeed, removeAllFeed } = feedSlice.actions;

export default feedSlice.reducer;
