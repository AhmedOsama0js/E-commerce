import { useSelector } from "react-redux";
import css from "./Avatar.module.css";
import img from "../../Dist/img/avatar-image.png";

export default function Avatar() {
  const { records, loading } = useSelector((state) => state.me);

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
