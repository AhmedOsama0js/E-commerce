import React from "react";
import css from "./Header.module.css";
import Time from "../../Time/Time";
import MainBtn from "../../Buttons/MainBtn/MainBtn";
import BtnFullscreen from "../../Buttons/BtnFullScreen/BtnFullscreen";
import DarkLight from "../../Buttons/DarkLigth/DarkLigth";
// import NavBtn from "../../Buttons/NavBtn/NavBtn";
import { GiShop } from "react-icons/gi";
import { Link } from "react-router-dom";
import LogOutAdmin from "../../Buttons/LogOutAdmin/LogOutAdmin";

export default function Header() {
  return (
    <div className={css.headerContainer}>
      <div className={css.time}>
        <Time />
      </div>
      <div className={css.buttons}>
        <MainBtn
          btn={
            <Link to="/">
              <GiShop />
            </Link>
          }
        />
        {/* <MainBtn btn={<NavBtn />} /> */}
        <MainBtn btn={<DarkLight />} />
        <MainBtn btn={<BtnFullscreen />} />
        <MainBtn btn={<LogOutAdmin/>} />
      </div>
    </div>
  );
}
