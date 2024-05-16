import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import MainBtn from "../MainBtn/MainBtn";
import Cookies from "js-cookie";
import css from "./LoginBtn.module.css"
import { Link } from "react-router-dom";

export default function LoginBtn() {
  const token = Cookies.get("access_token");
  const [isOpen, setIsOpen] = useState(false);

  const Drop = (
    <div className={`${css.dropContainer} ${isOpen ? css.block : css.none}`}>
      <Link title="login" to="/login">
        <div>login</div>
      </Link>
      <Link title="signup" to="/signup">
        <div>singUp</div>
      </Link>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      {!token && (
        <>
          <MainBtn btn={<FaUser onClick={() => setIsOpen(!isOpen)} />} />
          {Drop}
        </>
      )}
    </div>
  );
}
