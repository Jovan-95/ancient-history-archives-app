// utils/toast.js
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationsSlice";
import store from "../redux/store"; // tvoj redux store

export const showSuccessToast = (message) => {
  toast.success(message);
  // Koristimo store.dispatch jer ovo nije klasicna react funckija i nepodrzava useDispatch()
  store.dispatch(addNotification({ message, type: "success" }));
};

export const showErrorToast = (message) => {
  toast.error(message);
  store.dispatch(addNotification({ message, type: "error" }));
};

export const showInfoToast = (message) => {
  toast.info(message);
  store.dispatch(addNotification({ message, type: "info" }));
};
