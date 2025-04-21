import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>History App</h2>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/submit-content">Submit</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/bookmarks">Bookmarks</NavLink>
        <NavLink to="/timeline">Timeline</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
