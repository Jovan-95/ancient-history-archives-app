/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";

function Notifications() {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

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
          </div>
        ))}
      </div>
    </>
  );
}

export default Notifications;
