import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "./Auth.css";
import { UserInterface } from "../../utils/models";
import { baseUrl, userKey } from "../../utils/connection";
import { toastError } from "../../utils/msg";
import logo from "../../assets/img/logo.jpg";

const initalUserState: UserInterface = {
  email: "",
  password: "",
};

const Auth: React.FC<{
  onSetValidatingToken: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onSetValidatingToken }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInterface>(initalUserState);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const signin = () => {
    axios
      .post(`${baseUrl}/signin`, user)
      .then((res) => {
        localStorage.setItem(userKey, JSON.stringify(res.data));
        onSetValidatingToken(false);
        navigate("/");
      })
      .catch((e) => toastError(e.response.data));
  };

  const signup = () => {
    axios
      .post(`${baseUrl}/signup`, { email: user.email, password: user.password })
      .then(() => {
        setUser(initalUserState);
        setShowSignup(false);
        onSetValidatingToken(false);
        navigate("/");
      })
      .catch((e) => toastError(e.response.data));
  };

  const showSignupOnClick = () => setShowSignup(!showSignup);

  return (
    <div className="auth-content">
      <ToastContainer />
      <div className="auth-modal">
        <img src={logo} width="200" alt="Logo" />
        <hr />

        <div className="auth-title">{showSignup ? "Register" : "Login"}</div>

        {showSignup && (
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => {
              setUser({
                ...user,
                name: e.target.value,
              });
            }}
          />
        )}
        <input
          name="email"
          type="text"
          placeholder="E-mail"
          value={user.email}
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
        />
        {showSignup && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={user.confirmPassword}
            onChange={(e) => {
              setUser({
                ...user,
                confirmPassword: e.target.value,
              });
            }}
          />
        )}

        {showSignup ? (
          <button onClick={() => signup()}>Register</button>
        ) : (
          <button onClick={() => signin()}>Login</button>
        )}

        <p onClick={() => showSignupOnClick()}>
          {showSignup ? (
            <span>Already have a registration? Access Login</span>
          ) : (
            <span>You don't have a registration? Register here</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
