// import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserData } from "../../hooks/IsAuth";

export default function IsAuth({ children }) {
  const { role} = useUserData();
  const token = Cookies.get("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role === "user") {
    return <Navigate to="/" replace />;
  }

  return role === "admin" ? children : "problem";
}
