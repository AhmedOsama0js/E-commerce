import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import Cookies from "js-cookie";

export default function LoginBtn() {
  const access_token = Cookies.get("access_token");

  // come back to add User Data [user(photo-name-phone)]

  return (
    <>
      {!access_token && (
        <Link title="Login" to="/login">
          <MainBtn btn={<FaUser />} />
        </Link>
      )}
    </>
  );
}
