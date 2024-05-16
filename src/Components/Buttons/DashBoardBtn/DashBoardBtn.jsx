import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
// import { useSelector } from "react-redux";
import {useUserData} from "../../../hooks/IsAuth"

export default function DashBoardBtn() {
  const {role} = useUserData()
  // const { records } = useSelector((state) => state.me);
  return (
    <>
      {role === "admin" && (
        <Link title="Dashboard" to="/dashboard">
          <MainBtn btn={<MdSpaceDashboard />} />
        </Link>
      )}
    </>
  );
}
