import React, { useState } from "react";
import css from "./MainModel.module.css";
import { IoCloseSharp } from "react-icons/io5";
import MainBtn from "../../Components/Buttons/MainBtn/MainBtn";

export default function MainModel({ setModel, content }) {

  const [opening, setOpening] = useState(true);
  
  const handlePopup = () => {
    setModel(false);
    setOpening(false);

  };

  return (
    opening && (
      <div className={css.container}>
        <div onClick={handlePopup} className={css.overlay}></div>
        <div className={css.body}>
          {content}
          <span className={css.btn}>
            <MainBtn btn={<IoCloseSharp onClick={handlePopup} />} />
          </span>
        </div>
      </div>
    )
  );
}
