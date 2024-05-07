import React from "react";
import css from "./DataMony.module.css";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import {
  RiMoneyDollarCircleFill,
  RiMoneyPoundCircleFill,
} from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import HeadChart from "../../Charts/HeadChart/HeadChart";

export default function DataMony() {
  const dataPurchases = [100, 10, 50, 50, 30, 90, 20];
  const dataSales = [10, 70, 30, 90, 30, 90, 100];
  const dataMount = [40, 10, 100, 90, 30, 90, 10];

  return (<>
            <h5>Dashboard</h5>
    <div className={css.container}>
      <div className={css.card}>
        <div className={css.left}>
          <div className={css.head}>
            <span className={css.icon}>
              <BiSolidPurchaseTagAlt />
            </span>
            <span>Purchases</span>
          </div>
          <div className={css.amount}>
            <span>1021</span>
            <span>
              <MdOutlineAttachMoney />
            </span>
          </div>
          <div className={css.total}>
            <span>30% this week</span>
          </div>
        </div>
        <div className={css.right}>
          <HeadChart colors="#685e29" v={dataPurchases} />
        </div>
      </div>
      <div className={css.card}>
        <div className={css.left}>
          <div className={css.head}>
            <span className={css.icon}>
              <RiMoneyDollarCircleFill />
            </span>
            <span>Sales</span>
          </div>
          <div className={css.amount}>
            <span>1021</span>
            <span>
              <MdOutlineAttachMoney />
            </span>
          </div>

          <div className={css.total}>
            <span>30% this week</span>
          </div>
        </div>
        <div className={css.right}>
          <HeadChart colors="#1d585e" v={dataSales} />
        </div>
      </div>
      <div className={css.card}>
        <div className={css.left}>
          <div className={css.head}>
            <span className={css.icon}>
              <RiMoneyPoundCircleFill />
            </span>
            <span>Mount</span>
          </div>
          <div className={css.amount}>
            <span>1021</span>
            <span>
              <MdOutlineAttachMoney />
            </span>
          </div>
          <div className={css.total}>
            <span>0% this week</span>
          </div>
        </div>
        <div className={css.right}>
          <HeadChart colors="#8b2d37" v={dataMount} />
        </div>
      </div>
    </div>
  </>
  );
}
