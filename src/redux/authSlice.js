import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable no-unused-vars */
const initialState = {
  loggedInUsers: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addLoggedUser: (state, action) => {
      state.loggedInUsers = { ...action.payload };
    },
  },
});

export const { addLoggedUser } = authSlice.actions;

export default authSlice.reducer;
