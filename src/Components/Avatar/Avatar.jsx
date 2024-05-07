import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./Avatar.module.css"; 
import img from "../../Dist/img/avatar-image.png";
import { getMe } from "../../Store/getMeSlice";

export default function Avatar() {
  const { records, loading, error, complete } = useSelector(
    (state) => state.me
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  if (loading) {
    dispatch(getMe());
  }
  return (
    <>
        <div className={css.avatar}>
          {loading ? (
            <div className={css.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <img
              src={records?.data?.imageProfile || img}
              alt="Admin-dashboard-img"
            />
          )}
          <h5>{records?.data?.name}</h5>
          <p>{records?.data?.role}</p>
        </div>
    </>
  );
}
