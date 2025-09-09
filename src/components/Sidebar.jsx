/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import Modal from "./Modal";
import { useState } from "react";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    console.log("Logout");
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <aside className="sidebar">
      <h2>History App</h2>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/submit-content">Submit</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/admin/admin-moderation">Admin Moderation</NavLink>
        <NavLink to="/admin/admin-user-management">
          Admin User Management
        </NavLink>
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
