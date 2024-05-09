import React from 'react'
import css from "./DashBody.module.css"
import MainDashChart from '../../Charts/mainDashCahrt/mainDashCahrt';
import SellOrder from '../../Tables/SellOrder/SellOrder';
import Resent from '../../Tables/RecentActivies/Resent';
export default function DashBody() {
  return (
    <>
      <h5>Market Overview</h5>
      <div className={css.container}>
        <div className={css.top}>
          <MainDashChart />
        </div>
        <div className={css.right}>
          <h6>Operation Order</h6>
          <SellOrder />
        </div>
        <div className={css.bottom}>
          <Resent />
        </div>
      </div>
    </>
  );
}
