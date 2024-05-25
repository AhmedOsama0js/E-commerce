import React from 'react'
import { Link } from 'react-router-dom';
import MainBtn from '../MainBtn/MainBtn';
import { useUserData } from "../../../hooks/IsAuth"
import img from "../../../Dist/img/avatar-image.png"
export default function UserBtn() {
  const { role, userData } = useUserData()
  const Pic = (
    <img
      style={{ width: "30px", height: "30px", borderRadius:"50%" }}
      src={userData?.imageProfile || img}
      alt="userImg"
    />
  );
  return (
    <>
      {role === "user" && (
        <Link title="User Page" to="/userPage">
          <MainBtn btn={Pic} />
        </Link>
      )}
    </>
  );
}
