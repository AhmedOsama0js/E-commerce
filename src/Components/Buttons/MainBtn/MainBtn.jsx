import React from "react";
import css from "./MainBtn.module.css"
export default function MainBtn({ btn }) {
  return <div className={css.mainBtn}>{btn}</div>;
}
