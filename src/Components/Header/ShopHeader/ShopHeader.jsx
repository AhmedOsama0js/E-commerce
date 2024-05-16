import React from "react";
import css from "./ShopHeader.module.css";
import { useFormik } from "formik";
// import { Link } from "react-router-dom";
import MainBtn from "../../Buttons/MainBtn/MainBtn";
import { FiShoppingBag } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import DashBoardBtn from "../../Buttons/DashBoardBtn/DashBoardBtn";
import LoginBtn from "../../Buttons/LoginBtn/LoginBtn";
import UserBtn from "../../Buttons/UserBtn/UserBtn";

export default function ShopHeader() {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    // validationSchema: categoryFormValid,
    onSubmit: (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className={css.container}>
      <div className={css.logo}>
        <span>
          <FiShoppingBag />
        </span>
        <span>My Shop</span>
      </div>
      <div className={css.search}>
        <div className={css.inputContainer}>
          <span>
            <IoSearchOutline />
          </span>
          <input
            type="search"
            placeholder="Search"
            id="search"
            name="search"
            autoComplete="new-search"
            {...formik.getFieldProps("search")}
          />
        </div>
      </div>
      <div className={css.icons}>
        <DashBoardBtn />
        <UserBtn/>
        <LoginBtn/>
        <MainBtn btn={<FaHeart title="favorite" />} />
        <MainBtn btn={<HiShoppingCart title="car" />} />
      </div>
    </div>
  );
}
