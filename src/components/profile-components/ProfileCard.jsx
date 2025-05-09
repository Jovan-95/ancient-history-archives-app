/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserAvatar, editUser } from "../../services";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/Toast";

function ProfileCard({
  showAvatars,
  user,
  avatarImg,
  setShowAvatars,
  setAvatarImg,
}) {
  const avatarOptions = [
    "/images/boy-1.jpg",
    "/images/boy-2.jpg",
    "/images/girl-1.jpg",
  ];
  const [openEditModal, setOpenModal] = useState(false);
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();

  // Edit user fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(loggedUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // open modal edit user (profile)
  function openEditProfileModal() {
    setOpenModal(true);
  }

  // Patch HTTP method Edit user
  const { mutate: editUserFormFields } = useMutation({
    mutationFn: ({ userId, editedObj }) => editUser(userId, editedObj),
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

  // Edit user (profile)
  function handleSaveChanges() {
    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match!");
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
    showSuccessToast("Changes are saved!");
  }

  // Avatar change function
  function handleAvatarChange() {
    // Patch method call
    changeAvatar({
      userId: user.id,
      avatarImg: avatarImg,
    });
    setShowAvatars(false);
    showSuccessToast("Avatar is changed!");
  }
  return (
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
                <button onClick={handleSaveChanges} className="btn btn--cta">
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
  );
}

export default ProfileCard;
