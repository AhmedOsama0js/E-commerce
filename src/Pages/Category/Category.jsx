import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainTable from "../../Components/Tables/MainTable/MainTable";
import CategoryForm from "../../Components/Forms/CategoryForm/CategoryForm";
import MainBtn from "../../Components/Buttons/MainBtn/MainBtn";
import { MdDelete, MdEdit } from "react-icons/md";
import MainModel from "../../Model/mainModel/MainModel";
import DeleteBtnForm from "../../Components/Forms/DeleteBtnForm/DeleteBtnForm";
import { useSelector, useDispatch } from "react-redux";
import { getCategory, deleteCategory } from "../../Store/categorySlice";
import ErrorModel from "../../Model/errorModel/ErrorModel";

const Category = () => {
  const [sendData, setSendData] = useState([]);
  const [model, setModel] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const { records, loading, error, complete } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    if (complete) {
      setModel(false);
    }
  }, [dispatch, complete]);

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
        dispatch(deleteCategory(row.original._id));
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
        form={<CategoryForm type="add" SendData={[]} />}
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
          content={<CategoryForm type="edit" SendData={sendData} />}
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
};

export default Category;
