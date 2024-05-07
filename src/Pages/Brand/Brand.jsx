import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import MainTable from "../../Components/Tables/MainTable/MainTable";
import BrandsForm from "../../Components/Forms/BrandsForm/BrandsForm";
import MainModel from "../../Model/mainModel/MainModel";
import DeleteBtnForm from "../../Components/Forms/DeleteBtnForm/DeleteBtnForm";
import MainBtn from "../../Components/Buttons/MainBtn/MainBtn";
import { useSelector, useDispatch } from "react-redux";
import { getBrand, deleteBrand } from "../../Store/brandSlice";
import ErrorModel from "../../Model/errorModel/ErrorModel";

export default function Brand() {
  const [sendData, setSendData] = useState([]);
  const [model, setModel] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);

  const { records, loading, error, complete } = useSelector(
    (state) => state.brand
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
    if (complete) {
      setModel(false);
    }
  }, [complete, dispatch]);

  useEffect(() => {}, [error, loading, complete]);

  const handleEditClick = useCallback(
    (row) => {
      setSendData(row.original);
      setModel((prevModel) => !prevModel);
    },
    [setModel]
  );

  const handleDeleteClick = useCallback(
    (row) => {
      setModelDelete((prevModelDelete) => !prevModelDelete);
      const dispatchData = () => {
        dispatch(deleteBrand(row?.original?._id));
      };
      setSelectedRowForDelete(() => dispatchData);
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        id: "image",
        header: "Image",
        flex: 1,
        Cell: ({ row }) => (
          <img
            alt="avatar"
            height={40}
            src={row?.original?.image}
            loading="lazy"
            style={{ borderRadius: "25%" }}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
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
                <MdEdit
                  className="mainBtnIcon"
                  onClick={() => handleEditClick(row)}
                />
              }
            />
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
    [handleEditClick, handleDeleteClick]
  );

  return (
    <>
      <MainTable
        data={records?.data || []}
        columns={columns}
        form={<BrandsForm type="add" SendData={[]} loading={loading} />}
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
      {model && (
        <MainModel
          setModel={setModel}
          content={
            <BrandsForm type="edit" SendData={sendData} loading={loading} />
          }
        />
      )}
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
