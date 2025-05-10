/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: JSON.parse(localStorage.getItem("notifications")) || [],
};
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        message: action.payload.message,
        type: action.payload.type,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (note) => note.timestamp !== action.payload.timestamp
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
      localStorage.removeItem("notifications");
    },
  },
});
export const { addNotification, removeNotification, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

// removeUser: (state, action) => {
//   state.users = state.users.filter((user) => user.id !== action.payload.id);
//   localStorage.setItem("users", JSON.stringify(state.users)); // Update localStorage
// },
