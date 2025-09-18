/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotifications,
  removeNotification,
} from "../redux/notificationsSlice";

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  function handleRemoveNotification(note) {
    // console.log(note);
    dispatch(removeNotification(note));
  }

  function handleRemoveAll() {
    dispatch(clearNotifications());
  }
  return (
    <>
      <div className="notifications-page">
        <h2>Notifications</h2>
        {notifications.map((note, idx) => (
          <div key={idx} className={`notification ${note.type}`}>
            <p>
              <strong>{note.type.toUpperCase()}:</strong> {note.message}
            </p>
            <small>{new Date(note.timestamp).toLocaleString()}</small>
            <button
              onClick={() => handleRemoveNotification(note)}
              className="btn-reject mt-3"
            >
              Remove
            </button>
          </div>
        ))}
        {notifications.length < 1 ? (
          ""
        ) : (
          <button onClick={handleRemoveAll} className="btn-reject">
            Remove ALL
          </button>
        )}
      </div>
    </>
  );
}

export default Notifications;
