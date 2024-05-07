import React from "react";
import css from "./Sidebar.module.css";
import Avatar from "../Avatar/Avatar";
import GoPages from "../GoPages/GoPages";
import AppWithLocalStorage from "../LastTime/LastTime";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={css.sidebarContainer}>
      <Link to="myPage" title="myPage">
        <Avatar />
      </Link>
      <GoPages />
      <AppWithLocalStorage />
    </div>
  );
}
