import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import { useSelector } from "react-redux";

export default function DashBoardBtn() {
  const { records } = useSelector((state) => state.me);
  return (
    <>
      {records?.data?.role === "admin" && (
        <Link title="Dashboard" to="/dashboard">
          <MainBtn btn={<MdSpaceDashboard />} />
        </Link>
      )}
    </>
  );
}
