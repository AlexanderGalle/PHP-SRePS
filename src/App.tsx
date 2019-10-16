import React, { useState } from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "./views/Dashboard";
import firebase from "firebase";
import LoginScreen from "./views/Authentication/LoginScreen";

export default () => {
  const [user, loading] = useAuthState(firebase.auth());
  if (loading) return null;
  if (user) return <Dashboard />;
  return <LoginScreen />;
};
