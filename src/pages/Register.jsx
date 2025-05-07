/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services";

function Register() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  function handleRegister(e) {
    e.preventDefault();

    // Form validation
    if (
      userObj.username === "" ||
      userObj.email === "" ||
      userObj.password === "" ||
      userObj.confirmPassword === ""
    )
      return alert("Fill all fields!");

    if (userObj.username.length < 3) {
      return alert("Username is too short!");
    }

    if (!validateEmail(userObj.email)) {
      return alert("Invalid Email!");
    }

    if (userObj.password.length < 6) {
      return alert("Password is to short!");
    }

    if (userObj.password !== userObj.confirmPassword) {
      return alert("Passwords are not matching!");
    }

    alert("You registration is successfull!");

    // POST HTTP call and register new user with default role
    registerUser({
      ...userObj,
      role: "Researcher",
      bookmarksArtifacts: [],
      likesArtifacts: [],
      bookmarksCollections: [],
      likesCollections: [],
      bookmarksTimelines: [],
      likesTimelines: [],
      status: "",
    });

    navigate("/login");

    // reset fields
    setUserObj({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  function goToLogin() {
    navigate("/login");
  }
  return (
    <div className="wrapper-auth">
      <div className="auth-box">
        <h2 className="auth-title">Create Your Account</h2>

        <form className="auth-form">
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

          <button
            onClick={handleRegister}
            type="submit"
            className="btn btn--auth"
          >
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
