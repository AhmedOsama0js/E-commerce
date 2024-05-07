import { useCallback, useEffect, useMemo, useState } from "react";
import MainTable from "../../Components/Tables/MainTable/MainTable";
import MainBtn from "../../Components/Buttons/MainBtn/MainBtn";
import { MdDelete, MdEdit } from "react-icons/md";
import SubcategoryForm from "../../Components/Forms/SubcategoryForm/SubcategoryForm";
import MainModel from "../../Model/mainModel/MainModel";
import DeleteBtnForm from "../../Components/Forms/DeleteBtnForm/DeleteBtnForm";
import { useSelector, useDispatch } from "react-redux";
import {
  getSubcategory,
  deleteSubcategory,
} from "../../Store/subcategorySlice";
import ErrorModel from "../../Model/errorModel/ErrorModel";

export default function Subcategory() {
  const [sendData, setSendData] = useState([]);
  const [model, setModel] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);

  const { records, loading, error, complete } = useSelector(
    (state) => state.subcategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcategory());
    if (complete === true) {
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
        dispatch(deleteSubcategory(row.original._id));
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
        size: 50,
      },
      {
        accessorKey: "category.name",
        header: "Category",
        size: 50,
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
        form={<SubcategoryForm type="add" SendData={[]} />}
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
          content={<SubcategoryForm type="edit" SendData={sendData} />}
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
