import React, { useState } from "react";
import css from "../mainStyleForm.module.css";

export default function DeleteBtnForm({ setModel, deleteData }) {
  const [opening, setOpening] = useState(true);

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
        <p>Are you sure you want to delete this item?</p>
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
