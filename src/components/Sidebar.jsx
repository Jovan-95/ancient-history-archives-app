/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import Modal from "./Modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getUsers from "../services";

function Sidebar() {
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

  function handleLogout() {
    console.log("Logout");
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <aside className="sidebar">
      <h2>
        <div className="logo-wrapper">
          <img src="/images/ancient-history-logo.png" alt="logo" />
        </div>
      </h2>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/stats">Statistics</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/inbox">Inbox</NavLink>

        {user?.role === "Admin" || user?.role === "Researcher" ? (
          <NavLink to="/submit-content">Submit</NavLink>
        ) : (
          ""
        )}
        <NavLink to="/notifications">Notifications</NavLink>
        {user?.role === "Admin" ? (
          <>
            <NavLink to="/admin/admin-moderation">Admin Moderation</NavLink>
            <NavLink to="/admin/admin-user-management">
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
          <p style={{ color: "#000" }}>Are you sure you want to logout?</p>
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
    </aside>
  );
}

export default Sidebar;
