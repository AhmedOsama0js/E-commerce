import React from "react";
import css from "./Resent.module.css";
import data from "../../../Dist/Data/data.json";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const ResentItem = ({ item }) => (
  <div className={css.content}>
    <div>
      {item.operationType === "buy" ? (
        <span className={css.icon}>
          <FaArrowTrendUp />
        </span>
      ) : (
        <span className={css.icon}>
          <FaArrowTrendDown />
        </span>
      )}
    </div>
    <div>Client</div>
    <div>{item.timestamp.split("T")[0]}</div>
    <div>+{item.total}$</div>
    <div style={{ color: item.completed ? "#1d585e" : "#8b2d37" }}>
      {item.completed ? "completed" : "no completed"}
    </div>
  </div>
);

const Resent = () => {
  const D = data.sell.slice(0, 2);

  if (!D || D === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <h6>Recent Activities</h6>
      <div className={css.container}>
        {D.map((item, i) => (
          <ResentItem key={i} item={item} />
        ))}
      </div>
    </>
  );
};

export default Resent;
