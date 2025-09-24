/* eslint-disable no-unused-vars */
import { useState } from "react";
import MobileModal from "./MobileModal";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Modal from "./Modal";
import { useQuery } from "@tanstack/react-query";
import getUsers from "../services";

function Header() {
  const [mobModal, setMobModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // HTTP loading and error
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading data.</p>;

  // Finding logged user on backend by comparing with logged user from redux
  const user = usersData.find((user) => user.id === loggedUser.id);
  const inboxNumber = user?.inbox.filter((msg) => msg.visibility === false);

  function handleLogout() {
    console.log("Logout");
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <>
      <div className="header-wrapper">
        <div className="header">
          <svg
            onClick={() => setMobModal(true)}
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect fill="#fff" width="80" height="20" rx="10"></rect>
            <rect fill="#fff" y="30" width="80" height="20" rx="10"></rect>
            <rect fill="#fff" y="60" width="80" height="20" rx="10"></rect>
          </svg>
        </div>
        {mobModal ? (
          <MobileModal>
            <>
              <div
                onClick={() => setMobModal(false)}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  cursor: "pointer",
                }}
              >
                X
              </div>
              <div className="navigation">
                <h2>History App</h2>
                <nav>
                  <NavLink to="/home" onClick={() => setMobModal(false)}>
                    Home
                  </NavLink>
                  <NavLink to="/stats" onClick={() => setMobModal(false)}>
                    Statistics
                  </NavLink>
                  <NavLink to="/explore" onClick={() => setMobModal(false)}>
                    Explore
                  </NavLink>
                  <NavLink to="/profile" onClick={() => setMobModal(false)}>
                    Profile
                  </NavLink>
                  <NavLink to="/inbox" onClick={() => setMobModal(false)}>
                    Inbox{" "}
                    {inboxNumber.length === 0 ? (
                      <span className="inbox-num-wrapper-zero">
                        <span className="inbox-num">{inboxNumber.length}</span>
                      </span>
                    ) : (
                      <span className="inbox-num-wrapper">
                        <span className="inbox-num">{inboxNumber.length}</span>
                      </span>
                    )}
                  </NavLink>
                  {user?.role === "Admin" || user?.role === "Researcher" ? (
                    <NavLink
                      to="/submit-content"
                      onClick={() => setMobModal(false)}
                    >
                      Submit
                    </NavLink>
                  ) : (
                    ""
                  )}
                  <NavLink
                    to="/notifications"
                    onClick={() => setMobModal(false)}
                  >
                    Notifications
                  </NavLink>
                  {user?.role === "Admin" ? (
                    <>
                      <NavLink
                        to="/admin/admin-moderation"
                        onClick={() => setMobModal(false)}
                      >
                        Admin Moderation
                      </NavLink>
                      <NavLink
                        to="/admin/admin-user-management"
                        onClick={() => setMobModal(false)}
                      >
                        Admin User Management
                      </NavLink>
                    </>
                  ) : (
                    ""
                  )}
                </nav>
                <div
                  style={{
                    marginTop: "100px",
                  }}
                >
                  <button className="btn" onClick={() => setIsOpen(true)}>
                    Logout
                  </button>
                </div>
                <div className={isOpen ? "d-block" : "d-none"}>
                  <Modal>
                    <p style={{ color: "#000" }}>
                      Are you sure you want to logout?
                    </p>
                    <button className="btn" onClick={handleLogout}>
                      Logout
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{ marginLeft: "32px" }}
                      className="btn"
                    >
                      Cancel
                    </button>
                  </Modal>
                </div>
              </div>
            </>
          </MobileModal>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Header;
