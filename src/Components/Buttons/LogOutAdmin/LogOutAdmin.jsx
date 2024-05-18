
import { MdLogout } from "react-icons/md";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MainModel from "../../../Model/mainModel/MainModel";
import DeleteBtnForm from "../../Forms/DeleteBtnForm/DeleteBtnForm";

export default function LogOutAdmin() {

  const [modelDelete, setModelDelete] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const navigate = useNavigate();
  const logOut = () => {
    const logoutSure = () => {
      Cookies.remove("access_token");
      navigate("/");
    };
    setSelectedRowForDelete(() => logoutSure);
    setModelDelete(true);
  };

  return (
    <>
      <MdLogout onClick={()=>logOut()} />
      {modelDelete && (
        <MainModel
          setModel={setModelDelete}
          content={
            <DeleteBtnForm
              setModel={setModelDelete}
              deleteData={selectedRowForDelete}
              msg="Are You Sure To logOut "
            />
          }
        />
      )}
    </>
  );
}
