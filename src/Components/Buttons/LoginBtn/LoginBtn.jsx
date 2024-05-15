import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import Cookies from "js-cookie";

export default function LoginBtn() {
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (token) {
    console.log("good");
  }
  }, [token]);
  // come back to add User Data [user(photo-name-phone)]
  return (
    <>
      {!token && (
        <Link title="Login" to="/login">
          <MainBtn btn={<FaUser />} />
        </Link>
      )}
    </>
  );
}
