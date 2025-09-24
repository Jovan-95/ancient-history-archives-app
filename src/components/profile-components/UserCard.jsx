/* eslint-disable no-unused-vars */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../Modal";
import { sendMessage } from "../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../Toast";

function UserCard({ el, user }) {
  const [messageModal, setMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [targetUserId, setTargetUserId] = useState(null);

  const queryClient = useQueryClient();

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

  function openMessageModal(id) {
    setTargetUserId(id);
    setMessageModal(true);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    if (!messageText.trim()) {
      showErrorToast("Field is empty!");
      return;
    }

    const inboxObj = {
      id: String(Date.now()),
      from: user.username,
      message: messageText,
      timestamp: Date.now(),
      visibility: false,
    };
    mutateSendMessage({ userId: targetUserId, message: inboxObj });
  }

  return (
    <>
      <div key={el.id} className="user-card">
        {user?.id === el.id && (
          <h2 style={{ color: "green" }}>Your profile!</h2>
        )}

        <div>
          <strong>Username:</strong> {el?.username}
        </div>
        <div>
          <strong>Email:</strong> {el?.email}
        </div>
        <div>
          <strong>Role:</strong> {el?.role}
        </div>

        <div>
          <NavLink to={`/profile/${el.id}`}>
            <button className="btn btn--cta">More</button>
          </NavLink>
        </div>

        {user?.id !== el.id && (
          <button
            onClick={() => openMessageModal(el.id)}
            className="btn btn--cta"
          >
            Send message
          </button>
        )}
        {user?.id === el.id && (
          <p style={{ color: "green" }}>You can't send message to yourself!</p>
        )}
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
    </>
  );
}

export default UserCard;
