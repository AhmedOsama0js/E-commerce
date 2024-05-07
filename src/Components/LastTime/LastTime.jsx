import React, { useEffect, useState } from "react";
import css from "./LastTime.module.css";
import { MdHistory } from "react-icons/md";

const AppWithLocalStorage = () => {
  useEffect(() => {
    const handleUnload = () => {
      const currentTime = new Date().toISOString();
      localStorage.setItem("lastClosedTime", currentTime);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const [lastClosedTime, setLastClosedTime] = useState(null);

  useEffect(() => {
    const storedTime = localStorage.getItem("lastClosedTime");
    if (storedTime) {
      setLastClosedTime(storedTime);
    }
  }, []);

  return (
    <div className={css.body}>
      <div className={css.header}>
        <span>
          <MdHistory />
        </span>
        <h6>Last closed time</h6>
      </div>
      <div className={css.time}>
        {lastClosedTime && (
          <>
            <p>{new Date(lastClosedTime).toLocaleString().split(",")[0]}</p>
            <p>{new Date(lastClosedTime).toLocaleString().split(",")[1]}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AppWithLocalStorage;
