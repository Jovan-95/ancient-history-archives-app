/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getUsers, {
  changeUserAvatar,
  deleteUser,
  editUser,
  getArtifacts,
  getCollections,
  getTimelines,
  removeArtifactFromBookmarks,
  removeArtifactFromLikes,
  removeCollectionFromBookmarks,
  removeCollectionFromLikes,
  removeTimelineFromBookmarks,
  removeTimelineFromLikes,
} from "../services";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal";

function Profile() {
  // Logged user from redux
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();
  const [avatarImg, setAvatarImg] = useState();
  const [showAvatars, setShowAvatars] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openEditModal, setOpenModal] = useState(false);
  const [targetDeletedUser, setTargetDeletedUser] = useState("");

  // Edit user fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(loggedUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const avatarOptions = [
    "/images/boy-1.jpg",
    "/images/boy-2.jpg",
    "/images/girl-1.jpg",
  ];

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

  // Patch HTTP method calling
  const { mutate: bookmarkArtifact } = useMutation({
    mutationFn: ({ userId, updatedBookmarks }) =>
      removeArtifactFromBookmarks(userId, updatedBookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: bookmarkCollection } = useMutation({
    mutationFn: ({ userId, updatedBookmarks }) =>
      removeCollectionFromBookmarks(userId, updatedBookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: bookmarkTimeline } = useMutation({
    mutationFn: ({ userId, updatedBookmarks }) =>
      removeTimelineFromBookmarks(userId, updatedBookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: likesArtifact } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      removeArtifactFromLikes(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: likesCollection } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      removeCollectionFromLikes(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: likesTimeline } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      removeTimelineFromLikes(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method Avatar change
  const { mutate: changeAvatar } = useMutation({
    mutationFn: ({ userId, avatarImg }) => changeUserAvatar(userId, avatarImg),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method Edit user
  const { mutate: editUserFormFields } = useMutation({
    mutationFn: ({ userId, editedObj }) => editUser(userId, editedObj),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Delete HTTP method delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: (variables) => {
      // Optimistic update: odmah uklanjamo post sa UI
      const previousUsers = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (oldData) => {
        return oldData.filter((user) => user.id !== variables);
      });
      return { previousUsers };
    },
    onError: (err, variables, context) => {
      // Ako se nešto desi sa DELETE-om, vraćamo prethodno stanje
      queryClient.setQueryData(["users"], context.previousUsers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // refetch!
    },
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
    user.bookmarksArtifacts?.includes(String(artifact.id))
  );

  // Create new array with user liked artifact
  const userLikedArtifacts = artifactsData.filter((artifact) =>
    user.likesArtifacts?.includes(String(artifact.id))
  );

  // Create new array with user bookmark collections
  const userBookmarkedCollections = collectionsData.filter((collection) =>
    user.bookmarksCollections?.includes(String(collection.id))
  );

  // Create new array with user like collections
  const userLikedCollections = collectionsData.filter((collection) =>
    user.likesCollections?.includes(String(collection.id))
  );

  // Create new array with user bookmark timelines
  const userBookmarkedTimelines = timelinesData.filter((timeline) =>
    user.bookmarksTimelines?.includes(String(timeline.id))
  );

  // Create new array with user like timelines
  const userLikedTimelines = timelinesData.filter((timeline) =>
    user.likesTimelines?.includes(String(timeline.id))
  );

  // Removing artifact from bookmarks array
  function handleRemoveBookmarksFromUserArtifacts(artifact) {
    // Patch method calling
    bookmarkArtifact({
      userId: user.id,
      updatedBookmarks: user.bookmarksArtifacts.filter(
        (id) => id !== String(artifact.id)
      ),
    });
  }

  // Removing collection from bookmarks array
  function handleRemoveBookmarksFromUserCollections(collection) {
    bookmarkCollection({
      userId: user.id,
      updatedBookmarks: user.bookmarksCollections.filter(
        (id) => id !== String(collection.id)
      ),
    });
  }

  // Removing timeline from bookmarks array
  function handleRemoveBookmarksFromUserTimelines(timeline) {
    bookmarkTimeline({
      userId: user.id,
      updatedBookmarks: user.bookmarksTimelines.filter(
        (id) => id !== String(timeline.id)
      ),
    });
  }

  // Removing artifact from likes array
  function handleRemoveLikesFromUserArtifacts(artifact) {
    likesArtifact({
      userId: user.id,
      updatedLikes: user.likesArtifacts.filter(
        (id) => id !== String(artifact.id)
      ),
    });
  }

  // Removing collection from likes array
  function handleRemoveLikesFromUserCollection(collection) {
    likesCollection({
      userId: user.id,
      updatedLikes: user.likesCollections.filter(
        (id) => id !== String(collection.id)
      ),
    });
  }

  // Removing timeline from likes array
  function handleRemoveLikesFromUserTimeline(timeline) {
    likesTimeline({
      userId: user.id,
      updatedLikes: user.likesTimelines.filter(
        (id) => id !== String(timeline.id)
      ),
    });
  }

  // Avatar change function
  function handleAvatarChange() {
    // Patch method call
    changeAvatar({
      userId: user.id,
      avatarImg: avatarImg,
    });
    setShowAvatars(false);
  }

  // Open remove user modal
  function handleOpenRemoveModal(user) {
    setIsOpen(true);
    setTargetDeletedUser(user);
  }

  // Delete user
  function handleDeleteUser() {
    deleteMutation.mutate(targetDeletedUser.id);
  }

  // open modal edit user (profile)
  function openEditProfileModal() {
    setOpenModal(true);
  }

  // Edit user (profile)
  function handleSaveChanges() {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    editUserFormFields({
      userId: user.id,
      editedObj: {
        username,
        email,
        password,
      },
    });

    setOpenModal(false);
  }

  return (
    <>
      <div className="profile-page">
        <section className="current-user">
          <h2>Your Profile</h2>
          <div className="user-info">
            <div>
              <img
                className={!showAvatars ? "d-block" : "d-none"}
                src={user.avatar}
                alt="Profile picture"
              />
              <div className={showAvatars ? "d-block" : "d-none"}></div>
              <button
                className={!showAvatars ? "d-block " : "d-none"}
                onClick={() => setShowAvatars(true)}
              >
                Change avatar
              </button>
              <div>
                {avatarImg ? (
                  <button
                    className={showAvatars ? "d-block btn" : "d-none"}
                    onClick={handleAvatarChange}
                  >
                    Save
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className={showAvatars ? "d-block" : "d-none"}>
              {avatarOptions.map((img) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => setAvatarImg(img)}
                  className={avatarImg === img ? "selected" : ""}
                  alt="Choose avatar"
                />
              ))}
            </div>

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
              <div>
                {" "}
                <button onClick={openEditProfileModal} className="btn">
                  Edit profile
                </button>
              </div>
              <div className={openEditModal ? "d-block" : "d-none"}>
                <Modal>
                  <div>
                    <form className="auth-form">
                      <div className="auth-field">
                        <label className="auth-label">Username</label>
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          name="username"
                          className="auth-input"
                        />
                      </div>

                      <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          className="auth-input"
                        />
                      </div>

                      <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          className="auth-input"
                        />
                      </div>

                      <div className="auth-field">
                        <label className="auth-label">Confirm Password</label>
                        <input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          name="confirmPassword"
                          className="auth-input"
                        />
                      </div>
                    </form>
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={handleSaveChanges}
                      className="btn btn--cta"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="btn ml-4"
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Artifacts:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedArtifacts.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveBookmarksFromUserArtifacts(el)}
                  className="btn btn--cta"
                >
                  Remove from bookmarks
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Collections:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedCollections.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveBookmarksFromUserCollections(el)}
                  className="btn btn--cta"
                >
                  Remove from bookmarks
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Timelines:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedTimelines.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveBookmarksFromUserTimelines(el)}
                  className="btn btn--cta"
                >
                  Remove from bookmarks
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Artifacts:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedArtifacts.map((el) => (
              <div key={el.id}>
                {el.title}
                <button
                  onClick={() => handleRemoveLikesFromUserArtifacts(el)}
                  className="btn btn--cta"
                >
                  Remove from likes
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Collections:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedCollections.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveLikesFromUserCollection(el)}
                  className="btn btn--cta"
                >
                  Remove from likes
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Timelines:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedTimelines.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveLikesFromUserTimeline(el)}
                  className="btn btn--cta"
                >
                  Remove from likes
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="all-users">
          <h2>Other Users</h2>
          <div className="user-cards" id="userCards">
            {/* <!-- Kartice drugih korisnika --> */}
            {usersData.map((el) => (
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
                  <button
                    onClick={() => handleOpenRemoveModal(el)}
                    className="btn btn--cta ml-4"
                  >
                    Remove profile
                  </button>
                </div>
              </div>
            ))}
            <div className={isOpen ? "d-block" : "d-none"}>
              <Modal>
                <p>Are you sure you want to remove this user?</p>
                <button onClick={handleDeleteUser} className="btn">
                  Remove this user?
                </button>
                <button onClick={() => setIsOpen(false)} className="btn ml-4">
                  Cancel
                </button>
              </Modal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
