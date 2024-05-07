import React from 'react'
import css from "./MainAuth.module.css"

export default function MainAuth({element}) {
  return (
    <div className={css.main}>
    <div className={css.container}>
      <div className={css.box}>
        <div className={css.el}></div>
        <div className={css.el}></div>
        <div className={css.el}></div>
        <div className={css.el}></div>
      </div>
        <div className={css.box}>
          {element}
      </div>
    </div>
    </div>
  );
}
