import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getClients, deleteClients } from "../../Store/clientSlice";
import { useSelector, useDispatch } from "react-redux";
import ErrorModel from "../../Model/errorModel/ErrorModel";
import MainTable from "../../Components/Tables/MainTable/MainTable";
import img from "../../Dist/img/avatar-image.png"
import MainBtn from "../../Components/Buttons/MainBtn/MainBtn";
import { MdDelete } from "react-icons/md";
import MainModel from "../../Model/mainModel/MainModel";
import DeleteBtnForm from "../../Components/Forms/DeleteBtnForm/DeleteBtnForm";
// import { useNavigate } from "react-router-dom";

export default function Client() {

  const [modelDelete, setModelDelete] = useState(false);
    const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const { records, loading, error, complete } = useSelector(
    (state) => state.client
  );

  const dispatch = useDispatch();
    // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleDeleteClick = useCallback(
    (row) => {
      setModelDelete((prevModelDelete) => !prevModelDelete);
      const dispatchData = () => {
        dispatch(deleteClients(row?.original?._id));
      };
      setSelectedRowForDelete(() => dispatchData);
    },
    []
  );

    const columns = useMemo(
      () => [
        {
          accessorKey: "imageProfile",
          header: "User",
          flex: 1,
          Cell: ({ row }) => (
            <div className="action-btn">
              <img
                alt="avatar"
                src={row?.original?.imageProfile || img}
                height={30}
                width={30}
                loading="lazy"
                style={{ borderRadius: "50%" }}
              />
              <h5>{row?.original?.name}</h5>
            </div>
          ),
        },
        {
          accessorKey: "email",
          header: "Email",
          flex: 1,
        },
        {
          accessorKey: "phone",
          header: "Phone",
          flex: 1,
        },
        {
          accessorKey: "active",
          header: "Method",
          flex: 1,
          Cell: ({ row }) => (
            <span
              style={
                row?.original.active === "inactive"
                  ? { color: "green" }
                  : { color: "red" }
              }
            >
              {row?.original.active}
            </span>
          ),
        },
        {
          accessorKey: "role",
          header: "Role",
          flex: 1,
        },
        {
          id: "actions",
          header: "Actions",
          size: 100,
          Cell: ({ row }) => (
            <div className="action-btn">
              <MainBtn
                btn={
                  <MdDelete
                    className="mainBtnIcon"
                    onClick={() => handleDeleteClick(row)}
                  />
                }
              />
            </div>
          ),
        },
      ],
      [handleDeleteClick]
    );

  return (
    <>
      <MainTable
        data={records?.data || []}
        columns={columns}
        // form={ ()=> navigate("/")}
      />
      {error ? (
        <ErrorModel
          msg={error}
          loading={loading}
          error={error}
          complete={complete}
        />
      ) : null}
      {complete ? (
        <ErrorModel
          msg={error}
          loading={loading}
          error={error}
          complete={complete}
        />
      ) : null}
      {loading ? (
        <ErrorModel
          msg={error}
          loading={loading}
          error={error}
          complete={complete}
        />
      ) : null}
      {/* {model && (
        <MainModel
          setModel={setModel}
          content={
            <BrandsForm type="edit" SendData={sendData} loading={loading} />
          }
        />
      )} */}
      {modelDelete && (
        <MainModel
          setModel={setModelDelete}
          content={
            <DeleteBtnForm
              setModel={setModelDelete}
              deleteData={selectedRowForDelete}
            />
          }
        />
      )}
    </>
  );
}
