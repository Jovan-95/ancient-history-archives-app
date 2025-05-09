import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notReducer from "./notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notReducer,
  },
});
export default store;
