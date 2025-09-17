/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import getUsers, { sendMessage, updateMessageVisibility } from "../services";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import Modal from "../components/Modal";

function Inbox() {
  const queryClient = useQueryClient();
  const [messageModal, setMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [targetUserId, setTargetUserId] = useState(null);

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Change msg status
  const { mutate: toggleVisibility } = useMutation({
    mutationFn: ({ userId, msgId, newVisibility }) =>
      updateMessageVisibility(userId, msgId, newVisibility),
    onSuccess: (data) => {
      // Osveži cache da UI odmah prikaže promenu
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Send message
  const { mutate: mutateSendMessage } = useMutation({
    mutationFn: ({ userId, message }) => sendMessage(userId, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showSuccessToast("Message sent!");
      setMessageText("");
      setMessageModal(false);
    },
    onError: () => {
      showErrorToast("Error sending message!");
    },
  });

  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  function handleMsgToggle(msg) {
    toggleVisibility({
      userId: loggedUser.id, // id trenutnog korisnika
      msgId: msg.id,
      newVisibility: !msg.visibility,
    });
  }

  // HTTP loading and error
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading data.</p>;

  const currentUser = usersData?.find((u) => u.id === loggedUser.id);
  const inbox = currentUser?.inbox || [];

  function openMessageModal(id) {
    setMessageModal(true);
    setTargetUserId(id);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    if (!messageText.trim()) {
      showErrorToast("Field is empty!");
      return;
    }

    const inboxObj = {
      id: String(Date.now()),
      from: currentUser.username,
      message: messageText,
      timestamp: Date.now(),
      visibility: false,
    };
    mutateSendMessage({ userId: targetUserId, message: inboxObj });
  }
  return (
    <div className="inbox-page">
      <h1>📥 Inbox</h1>

      {inbox.length === 0 ? (
        <p className="empty-message">Your inbox is empty.</p>
      ) : (
        <div className="messages-wrapper">
          {inbox.map((msg) => (
            <div key={msg.id} className="message-card">
              <div className="message-header">
                <span className="from">From: {msg.from}</span>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleString()}{" "}
                  <div className="d-flex items-center">
                    <input
                      checked={msg.visibility}
                      onChange={() => handleMsgToggle(msg)}
                      type="checkbox"
                    />
                    <div className="msg-visibility">
                      {msg.visibility ? <p>Read</p> : <p>Unread</p>}
                    </div>
                  </div>
                </span>
              </div>
              <div className="message-body">
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="user-list-section">
        <h2>👥 All Users</h2>

        <div className="user-list">
          {usersData.map((user) => (
            <div key={user.id} className="user-card">
              <span className="username">{user.username}</span>
              {user.id === currentUser.id ? (
                <p style={{ color: "green" }}>
                  You can't send message to yourself!
                </p>
              ) : (
                <button
                  onClick={() => openMessageModal(user.id)}
                  className="btn"
                >
                  Send Message
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {messageModal && (
        <Modal>
          <div style={{ padding: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                cursor: "pointer",
                marginBottom: "8px",
              }}
              onClick={() => setMessageModal(false)}
            >
              X
            </div>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
              />
              <div style={{ marginTop: "1rem" }}>
                <button type="submit" className="btn btn--cta">
                  Send
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Inbox;
