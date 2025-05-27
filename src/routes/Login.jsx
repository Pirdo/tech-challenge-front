import React, { useContext, useMemo, useState } from "react";
// import AppID from "ibmcloud-appid-js";
import { Theme, Grid, Column, Button, TextInput } from "@carbon/react";
// import { AuthenticationContext } from "../../context/AuthenticationContext";
// import { useNavigate } from "react-router-dom";
// import loginImage from "../../assets/ibm-backgroud.svg";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import classes from "./NewPost.module.css";

import axios from "axios";

import "./login.scss";
import { api } from "../services/api";

export default function Login({ isLoginEnabled }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const loginAction = async () => {
    isLoginEnabled(false);
    if (isSignUp) return setIsSignUp(false);
    else {
      await api
        .get(`/users/login?user=${user}`)
        .then((res) => {
          console.log(res.data);
          context.saveUser(res.data.data);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Modal>
        <form method="post" className={classes.form} onSubmit={loginAction}>
          <p>
            <label htmlFor="name">Usuário</label>
            <input
              type="text"
              id="user"
              name="user"
              required
              onChange={(e) => setUser(e.target.value)}
            />{" "}
            <label htmlFor="name">Senha</label>
            <input
              type="password"
              id="name"
              name="tiulo"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p className={classes.actions}>
            <Button type="button" onClick={() => isLoginEnabled(false)}>
              Cancel
            </Button>
            <button>Submit</button>
          </p>
        </form>
      </Modal>
    </>
  );
}
