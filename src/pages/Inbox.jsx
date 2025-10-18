/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getUsers, { sendMessage, updateMessageVisibility } from "../services";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import { supabase } from "../supabaseClient";
import { NewtonsCradle } from "ldrs/react";
import "ldrs/react/NewtonsCradle.css";

function Inbox() {
  const queryClient = useQueryClient();
  const [messageText, setMessageText] = useState("");

  const [convoUser, setConvoUser] = useState("");
  const [currentUserState, setCurrentUserState] = useState(null);

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
    },
    onError: () => {
      showErrorToast("Error sending message!");
    },
  });

  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // function handleMsgToggle(msg) {
  //   toggleVisibility({
  //     userId: loggedUser.id, // id trenutnog korisnika
  //     msgId: msg.id,
  //     newVisibility: !msg.visibility,
  //   });
  // }

  useEffect(() => {
    const user = usersData?.find((u) => u.id === loggedUser.id);
    setCurrentUserState(user);
  }, [usersData, loggedUser.id]);

  // --- Supabase Realtime subscription ---
  useEffect(() => {
    // Kreiraj kanal za realtime
    const channel = supabase
      .channel("public:users") // ime kanala, možeš staviti po tabeli
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          const updatedUser = payload.new;
          if (
            convoUser &&
            (updatedUser.id === convoUser.id ||
              updatedUser.id === loggedUser.id)
          ) {
            if (updatedUser.id === loggedUser.id) {
              setCurrentUserState(updatedUser);
            }
            if (updatedUser.id === convoUser.id) {
              setConvoUser(updatedUser);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [convoUser, loggedUser.id]);

  // HTTP loading and error
  if (usersIsLoading)
    return (
      <div className="loading-wrapper">
        <NewtonsCradle size="100" speed="1" color="#8b7355" />
      </div>
    );
  if (usersError) return <p>Error loading data.</p>;

  const currentUser = usersData?.find((u) => u.id === loggedUser.id);
  const inbox = currentUser?.inbox || [];

  //
  function handleConversation(user) {
    setConvoUser(user);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    if (!messageText.trim()) {
      showErrorToast("Field is empty!");
      return;
    }

    const inboxObj = {
      id: String(Date.now()),
      from: currentUserState.id,
      to: convoUser.id,
      message: messageText,
      timestamp: Date.now(),
      visibility: false,
    };

    setConvoUser((prev) => ({
      ...prev,
      inbox: [...(prev.inbox || []), inboxObj],
    }));

    mutateSendMessage({ userId: convoUser.id, message: inboxObj });

    setMessageText("");
  }

  return (
    <div className="inbox-page">
      <h1>📥 Inbox</h1>

      <div className="user-list-section">
        <h2>👥 All Users</h2>

        <div className="user-list">
          {usersData.map((user) =>
            user?.id !== currentUser?.id ? (
              <div key={user.id} className="user-card">
                <span className="username">{user.username}</span>
                <button
                  onClick={() => handleConversation(user)}
                  className="btn"
                >
                  Conversation
                </button>
              </div>
            ) : (
              ""
            )
          )}
        </div>

        {convoUser && (
          <>
            <section className="conversation">
              <h3>Conversation with {convoUser.username}</h3>

              {(() => {
                // 1. Skupi sve poruke između currentUserState i convoUser
                const conversationMessages = [
                  ...(currentUserState?.inbox || []),
                  ...(convoUser?.inbox || []),
                ].filter(
                  (msg) =>
                    (msg.from === currentUserState.id &&
                      msg.to === convoUser.id) ||
                    (msg.from === convoUser.id &&
                      msg.to === currentUserState.id)
                );

                // 2. Sortiraj po timestamp-u
                conversationMessages.sort((a, b) => a.timestamp - b.timestamp);

                // 3. Renderuj poruke
                return conversationMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${
                      msg.from === currentUserState.id ? "from-me" : "from-them"
                    }`}
                  >
                    <div className="bubble">{msg.message}</div>
                    <span className="time">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                ));
              })()}

              {/* Polje za kucanje nove poruke */}
            </section>
            <div className="conversation-input">
              <form className="message-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit" className="btn btn--cta">
                  Send
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Inbox;
