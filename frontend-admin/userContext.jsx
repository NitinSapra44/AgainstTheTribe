import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import axiosInstance from "./axiosInstance.js";

export const UserContext = createContext();

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/UserInfo")
      .then((response) => {
        setUser(response.data);
        setReady(true);
      })
      .catch((err) => {
        setReady(true);
        alert(err.response.data.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {" "}
      {props.children}{" "}
    </UserContext.Provider>
  );
};
export default UserState;
