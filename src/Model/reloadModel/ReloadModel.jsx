import React from 'react'
import css from "./ReloadModel.module.css"

export default function ReloadModel() {

  return (
    <div className={css.container}>
      <span className={css.loader}></span>
    </div>
  );
}
