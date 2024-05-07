import React, { useEffect, useState } from "react";
import css from "./ErrorModel.module.css";
import { MdOutlineErrorOutline } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";

export default function ErrorModel({ msg, loading, error, complete }) {
  const [state, setState] = useState({ error, complete, loading });

  useEffect(() => {
    if (error || complete) {
      const timer = setTimeout(() => {
        setState({ error: false, complete: false, loading: false });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, complete, loading]);

  const alertType = state.error
    ? { backgroundColor: "#81090993" }
    : state.complete
    ? { backgroundColor: "#17810993" }
    : state.loading
    ? { backgroundColor: "#81790993" }
    : null;

  const alertIcon = state.error ? (
    <MdOutlineErrorOutline />
  ) : state.complete ? (
    <GrStatusGood />
  ) : null;

  const errorAlert = (
    <div style={alertType} className={css.container}>
      <div className={css.text}>
        <span>{msg}</span>
        <span className={css.icon}>{alertIcon}</span>
      </div>
    </div>
  );

  const completeAlert = (
    <div style={alertType} className={css.container}>
      <div className={css.text}>
        <span>completed</span>
        <span className={css.icon}>{alertIcon}</span>
      </div>
    </div>
  );

  const loadingAlert = (
    <div style={alertType} className={css.container}>
      <div className={css.text}>
        <span>Loading ...</span>
        <div className={css.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {state.error && errorAlert}
      {state.complete && completeAlert}
      {state.loading && loadingAlert}
    </>
  );
}
