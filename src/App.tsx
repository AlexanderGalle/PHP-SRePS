import React, { useState } from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "./views/Dashboard";
import firebase from "firebase";
import Authentication from "./views/Authentication";

export default () => {
  const [user, loading] = useAuthState(firebase.auth());
  if (loading) return null;
  if (user) return <Dashboard />;
  return <Authentication />;
};
