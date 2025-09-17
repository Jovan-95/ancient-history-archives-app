/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getUsers from "../services";
import { useSelector } from "react-redux";

function Inbox() {
  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  const currentUser = usersData?.find((u) => u.id === loggedUser.id);
  const [inbox, setInbox] = useState(currentUser?.inbox || []);

  // HTTP loading and error
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading data.</p>;

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
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="message-body">
                <p>{msg.message}</p>
              </div>
              {/* Ovde možeš kasnije dodati dugme Read/Mark as Read */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inbox;
