import React from "react";
import css from "./myPage.module.css";
// import ImgAvatarChange from "./ImgAvatarChange/ImgAvatarChange";
import InfoAdmin from "./InfoAdmain/InfoAdmin";
import MyChart1 from "../../Components/Charts/MyChart1/MyChart1";
import MyChart2 from "../../Components/Charts/MyChart2/MyChart2";

export default function MyPage() {
  return (
    <>
      <div className={css.container}>
        <div className={css.data}>
          {/* <ImgAvatarChange /> */}
            <InfoAdmin />
        </div>
          <div className={css.chart1}>
            <MyChart2/>
          </div>
          <div className={css.chart2}>
            <MyChart1 />
          </div>
      </div>
    </>
  );
}
