// import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function IsAuth({ children }) {

  // come back to Add Advanced role

  const access_token = Cookies.get("access_token");

  const { records } = useSelector((state) => state.me);

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }
  return records?.data?.role === "admin" ? children : "problem";
}
