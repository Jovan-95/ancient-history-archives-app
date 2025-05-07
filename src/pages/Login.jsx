/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLoggedUser } from "../redux/authSlice";
import { useQuery } from "@tanstack/react-query";
import getUsers from "../services";

function Login() {
  const [loginUserObj, setLoginUserObj] = useState({ email: "", password: "" });
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting users from services with reactQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleLogin(e) {
    e.preventDefault();

    const user = data.find(
      (user) =>
        user.email === loginUserObj.email &&
        user.password === loginUserObj.password
    );

    if (!user) {
      alert("Wrong credentials!");
      return;
    }

    if (user.status === "banned") {
      alert("You are banned!");
      return;
    }

    if (user) {
      console.log("Logged user:", user);
      alert("Credentials are matching!");
      dispatch(
        addLoggedUser({
          ...loginUserObj,
          id: user.id,
          username: user.username,
        })
      );
      navigate("/home");
    }
  }

  function goToRegister() {
    navigate("/");
  }
  return (
    <div className="wrapper-auth">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>

        <form className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              onChange={(e) =>
                setLoginUserObj({ ...loginUserObj, email: e.target.value })
              }
              type="email"
              name="email"
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              onChange={(e) =>
                setLoginUserObj({ ...loginUserObj, password: e.target.value })
              }
              type="password"
              name="password"
              className="auth-input"
            />
          </div>

          <button onClick={handleLogin} type="submit" className="btn btn--auth">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Dont have an account?{" "}
          <a onClick={goToRegister} className="auth-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
