import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../routes/Login";
import Posts from "../routes/Posts";

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const clearUser = () => {
    setUser({});
    setIsAuthenticated(false);

    sessionStorage.clear();
    navigate("/");
  };

  const saveUser = (data) => {
    setUser(data);
    setIsAuthenticated(true);

    sessionStorage.setItem(
      "user",
      JSON.stringify({ ...data, exp: new Date().getTime() + 3600000 })
    );
  };

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    if (!currentUser) {
      return;
    }

    if (currentUser.exp < new Date().getTime()) {
      clearUser();
      return;
    }

    setUser(currentUser);
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, saveUser, clearUser }}>
      {!isAuthenticated ? <Posts /> : children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
