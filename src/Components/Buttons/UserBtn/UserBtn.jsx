import React from 'react'
import { Link } from 'react-router-dom';
import MainBtn from '../MainBtn/MainBtn';
import {useUserData} from "../../../hooks/IsAuth"
export default function UserBtn() {
  const { role, userData } = useUserData()
  const Pic = <img style={{width:"32px", height:"32px"}} src={userData?.imageProfile} alt="userImg" />;
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
