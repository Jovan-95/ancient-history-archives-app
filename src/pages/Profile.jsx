/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getUsers, {
  getArtifacts,
  getCollections,
  getTimelines,
} from "../services";
import { NavLink } from "react-router-dom";

function Profile() {
  // Logged user from redux
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

  // ReactQuery Get artifacts
  const {
    data: artifactsData,
    isLoading: artifactsIsLoading,
    error: artifactsError,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: getArtifacts,
  });

  // ReactQuery Get collections
  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  // ReactQuery Get timelines
  const {
    data: timelinesData,
    isLoading: timelinesIsLoading,
    error: timelinesError,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: getTimelines,
  });

  // HTTP loading and error
  if (
    usersIsLoading ||
    artifactsIsLoading ||
    collectionsIsLoading ||
    timelinesIsLoading
  )
    return <p>Loading...</p>;
  if (usersError || artifactsError || collectionsError || timelinesError)
    return <p>Error loading data.</p>;

  // Finding logged user on backend by comparing with logged user from redux
  const user = usersData.find((user) => user.id === loggedUser.id);

  // Create new array with user bookmark artifact
  const userBookmarkedArtifacts = artifactsData.filter((artifact) =>
    user.bookmarksArtifacts.includes(String(artifact.id))
  );

  // Create new array with user liked artifact
  const userLikedArtifacts = artifactsData.filter((artifact) =>
    user.likesArtifacts.includes(String(artifact.id))
  );

  // Create new array with user bookmark collections
  const userBookmarkedCollections = collectionsData.filter((collection) =>
    user.bookmarksCollections.includes(String(collection.id))
  );

  // Create new array with user like collections
  const userLikedCollections = collectionsData.filter((collection) =>
    user.likesCollections.includes(String(collection.id))
  );

  // Create new array with user bookmark timelines
  const userBookmarkedTimelines = timelinesData.filter((timeline) =>
    user.bookmarksTimelines.includes(String(timeline.id))
  );

  // Create new array with user like timelines
  const userLikedTimelines = timelinesData.filter((timeline) =>
    user.likesTimelines.includes(String(timeline.id))
  );

  return (
    <>
      <div className="profile-page">
        <section className="current-user">
          <h2>Your Profile</h2>
          <div className="user-info">
            <img src="/images/avatar.png" alt="Profile picture" />
            <div>
              <p className="username-text">
                <strong>Username: </strong> {user.username}
              </p>
              <p className="email-text">
                <strong>Email: </strong> {user.email}
              </p>
              <p className="role-text">
                <strong>Role: </strong>
                {user.role}
              </p>
            </div>
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Artifacts:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedArtifacts.map((el) => (
              <div key={el.id}>{el.title}</div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Collections:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedCollections.map((el) => (
              <div key={el.id}>{el.title}</div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Timelines:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedTimelines.map((el) => (
              <div key={el.id}>{el.title}</div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Artifacts:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedArtifacts.map((el) => (
              <div key={el.id}>{el.title}</div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Collections:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedCollections.map((el) => (
              <div key={el.id}>{el.title}</div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Timelines:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedTimelines.map((el) => (
              <div key={el.id}>{el.title}</div>
            ))}
          </div>
        </section>

        <section className="all-users">
          <h2>Other Users</h2>
          <div className="user-cards" id="userCards">
            {/* <!-- Kartice drugih korisnika --> */}
            {usersData.map((el) => (
              <div key={el.id} className="user-card">
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
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
