/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import getUsers from "../../services";
import { useQuery } from "@tanstack/react-query";

function SingleProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const singleUser = usersData.find((user) => user.id === id);

  return (
    <div className="profile-page">
      <section className="current-user">
        <h2>{singleUser.username}'s profile</h2>
        <div className="user-info">
          <img src={singleUser.avatar} alt="Profile picture" />
          <div>
            <p className="username-text">
              <strong>Username: </strong> {singleUser.username}
            </p>
            <p className="email-text">
              <strong>Email: </strong> {singleUser.email}
            </p>
            <p className="role-text">
              <strong>Role: </strong>
              {singleUser.role}
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="btn btn--cta"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleProfile;
