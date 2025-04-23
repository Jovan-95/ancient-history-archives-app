/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable no-unused-vars */
const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addLoggedUser: (state, action) => {
      state.loggedInUser = { ...action.payload };
      localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { addLoggedUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
