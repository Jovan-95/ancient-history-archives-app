import { NavLink } from "react-router-dom";

function UserCard({ el, user }) {
  return (
    <>
      <div key={el.id} className="user-card">
        {user.id === el.id ? (
          <h2 style={{ color: "green" }}>Your profile!</h2>
        ) : (
          ""
        )}
        <div>
          <strong>Username:</strong> {el.username}
        </div>
        <div>
          {" "}
          <strong>Email:</strong> {el.email}
        </div>
        <div>
          {" "}
          <strong>Role:</strong> {el.role}
        </div>

        <div>
          <NavLink to={`/profile/${el.id}`}>
            {" "}
            <button className="btn btn--cta">More</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserCard;
