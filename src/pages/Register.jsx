/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services";
import { showSuccessToast, showErrorToast } from "../components/Toast";

function Register() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function handleRegister(e) {
    e.preventDefault();

    // Form validation
    if (
      !userObj.username ||
      !userObj.email ||
      !userObj.password ||
      !userObj.confirmPassword
    ) {
      return showErrorToast("Fill all fields!");
    }

    if (userObj.username.length < 3) {
      return showErrorToast("Username is too short!");
    }

    if (!validateEmail(userObj.email)) {
      return showErrorToast("Invalid Email!");
    }

    if (userObj.password.length < 6) {
      return showErrorToast("Password is too short!");
    }

    if (userObj.password !== userObj.confirmPassword) {
      return showErrorToast("Passwords are not matching!");
    }

    try {
      await registerUser({
        username: userObj.username,
        email: userObj.email,
        password: userObj.password,
        confirmPassword: userObj.confirmPassword,
        role: "Researcher",
        bookmarksArtifacts: [],
        likesArtifacts: [],
        bookmarksCollections: [],
        likesCollections: [],
        bookmarksTimelines: [],
        likesTimelines: [],
        inbox: [],
        status: "pending",
        avatar: "/images/boy-1.jpg",
      });

      showSuccessToast("Registration successful!");
      navigate("/login");

      setUserObj({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      showErrorToast("Registration failed: " + err.message);
    }
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <div className="wrapper-auth">
      <div className="auth-box">
        <div className="logo-wrapper">
          <img src="/images/ancient-history-logo.png" alt="logo" />
        </div>
        <h2 className="auth-title">Create Your Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, username: e.target.value })
              }
              value={userObj.username}
              type="text"
              name="username"
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, email: e.target.value })
              }
              value={userObj.email}
              type="email"
              name="email"
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, password: e.target.value })
              }
              value={userObj.password}
              type="password"
              name="password"
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, confirmPassword: e.target.value })
              }
              value={userObj.confirmPassword}
              type="password"
              name="confirmPassword"
              className="auth-input"
            />
          </div>

          <button type="submit" className="btn btn--auth">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a onClick={goToLogin} className="auth-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
