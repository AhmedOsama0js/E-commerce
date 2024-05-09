import React, { useEffect } from "react";
import "./Shop.css";
import ShopHeader from "./Components/Header/ShopHeader/ShopHeader";
// import MainSlider from "./Components/MainSlider/MainSlider";
import { useDispatch } from "react-redux";
import { getMe } from "./Store/getMeSlice";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(getMe());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container-shop">
      <ShopHeader />
      <div
        style={{
          height: "calc(100vh - 50px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
        <h1>The storefront for the user will be created soon.</h1>
        <h1>سيتم إنشاء واجهة المتجر للمستخدم قريبًا</h1>
      </div>
      {/* <MainSlider /> */}
    </div>
  );
}
