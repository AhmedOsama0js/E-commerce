import React from "react";
import css from "./Dashboard.module.css";
import DataMony from "../../Components/DashbordCmp/DatatMony/DataMony";
import DashBody from "../../Components/DashbordCmp/DashBody/DashBody";


export default function Dashboard() {

  
  return (
    <div className={css.container}>
      <div className={css.top}>
        <DataMony />
      </div>
      <div className={css.bottom}>
        <DashBody />
      </div>
    </div>
  );
}
