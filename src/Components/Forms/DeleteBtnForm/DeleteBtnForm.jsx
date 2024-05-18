import React, { useState } from "react";
import css from "../mainStyleForm.module.css";

export default function DeleteBtnForm({ setModel, deleteData, msg }) {
  const [opening, setOpening] = useState(true);
  const [massage, ] = useState(
    msg || "Are you sure you want to delete this item?"
  );

  const NoHandler = () => {
    setModel(false);
    setOpening(false);
  };

  const handlePopup = () => {
    deleteData();
    setModel(false);
    setOpening(false);
  };

  return (
    opening && (
      <div className={css.bodyDelete}>
        <p>{massage}</p>
        <div className={css.btns}>
          <button className="button" onClick={handlePopup}>
            Yes
          </button>
          <button className="button" onClick={NoHandler}>
            No
          </button>
        </div>
      </div>
    )
  );
}
