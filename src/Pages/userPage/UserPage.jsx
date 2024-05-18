import React, { useState } from "react";
import MainModel from "../../Model/mainModel/MainModel";
import Cookies from "js-cookie";
import DeleteBtnForm from "../../Components/Forms/DeleteBtnForm/DeleteBtnForm";
import { useNavigate } from "react-router-dom";
import ShopHeader from "../../Components/Header/ShopHeader/ShopHeader";

export default function UserPage() {
  const [modelDelete, setModelDelete] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
    const navigate = useNavigate();
  const logOut = () => {
    const logoutSure = () => {
      Cookies.remove("access_token");
      navigate("/");
    }
    setSelectedRowForDelete( () => logoutSure);
    setModelDelete(true);
  };

  return (
    <>
      <ShopHeader />
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1> Welcome, User, To Your Page </h1>
        <h3>The page will be completed later</h3>
        <h3>سوف يتم اكمال الصفحة فيما بعد </h3>
        <button className="button" onClick={() => logOut()}>
          logOut
        </button>
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
      </div>
    </>
  );
}
