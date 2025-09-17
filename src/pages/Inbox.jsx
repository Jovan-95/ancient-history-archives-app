/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getUsers, { sendMessage, updateMessageVisibility } from "../services";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../components/Toast";

function Inbox() {
  const queryClient = useQueryClient();
  const [msgStatus, setMsgStatus] = useState();

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Mutation
  const { mutate: toggleVisibility } = useMutation({
    mutationFn: ({ userId, msgId, newVisibility }) =>
      updateMessageVisibility(userId, msgId, newVisibility),
    onSuccess: (data) => {
      // Osveži cache da UI odmah prikaže promenu
      queryClient.invalidateQueries(["users"]);
    },
  });

  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  const currentUser = usersData?.find((u) => u.id === loggedUser.id);
  const inbox = currentUser?.inbox || [];

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

  function handleMsgStatus(msg) {
    console.log(msg);
    setMsgStatus((prev) => !prev);
    console.log(msgStatus);
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
    </div>
  );
}

export default Inbox;
