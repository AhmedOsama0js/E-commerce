import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainTable from "../../Components/Tables/MainTable/MainTable";
import ProductForm from "../../Components/Forms/ProductForm/ProductForm";
import ErrorModel from "../../Model/errorModel/ErrorModel";
import MainBtn from "../../Components/Buttons/MainBtn/MainBtn";
import { MdDelete, MdEdit } from "react-icons/md";
import MainModel from "../../Model/mainModel/MainModel";
import DeleteBtnForm from "../../Components/Forms/DeleteBtnForm/DeleteBtnForm";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, deleteProducts } from "../../Store/productSlice";

export default function Product() {
  const [sendData, setSendData] = useState([]);
  const [model, setModel] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const { records, loading, error, complete } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    if (complete) {
      setModel(false);
    }
  }, [complete, dispatch]);

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
        dispatch(deleteProducts(row.original._id));
      };
      setSelectedRowForDelete(() => dispatchData);
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "imageCover",
        header: "Image",
        flex: 1,
        Cell: ({ row }) => (
          <>
            <img
              alt="avatar"
              height={30}
              width={30}
              src={row?.original?.imageCover}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />

            {row?.original?.images?.map((param, index) => (
              <img
                key={index}
                height={20}
                width={20}
                style={{ borderRadius: "50%" }}
                src={param}
                alt={row?.original?.title[index]}
              />
            ))}
            {/* <span title="more images">{`+${row?.original?.images.length}`}</span> */}
          </>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        flex: 1,
      },
      {
        accessorKey: "description",
        header: "Description",
        flex: 1,
        Cell: ({ row }) => (
          <span
            title={row?.original?.description}
            key={row?.original?._id}
          >{`${row?.original?.description?.slice(0, 20)}...`}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 50,
        Cell: ({ row }) => (
          <span key={row.original?._id}>{`${row?.original?.price}$`}</span>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 50,
        Cell: ({ row }) => (
          <span
            key={row.original._id}
          >{`${row?.original.quantity} piece`}</span>
        ),
      },
      {
        accessorKey: "priceAfterDiscount",
        header: "Discount",
        size: 50,
      },
      {
        accessorKey: "ratingQuantity",
        header: "Rating",
        size: 50,
      },
      {
        accessorKey: "colors",
        header: "Colors",
        flex: 1,
        Cell: ({ row }) => (
          <div style={{display: "flex", gap: "5px",alignItem:"center",justifyContent:"center"}}  key={row?.original?._id}>
            {row?.original?.colors?.map((param, index) => (
                <div
                  style={{
                    backgroundColor: `${param}`,
                    width: "20px",
                    height: "20px",
                    border: "1px solid #fff",
                    borderRadius: "50%",
                  }}
                  key={index}
                >
                  
                </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "subCategory",
        header: "subCategory",
        flex: 1,
        Cell: ({ row }) => (
          <div key={row.original._id}>
            {row?.original?.subCategory?.map((param, index) => (
              <span key={index}>
                {param?.name}
                {index < row?.original?.subCategory.length - 1 && " - "}
              </span>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        flex: 1,
        Cell: ({ row }) => (
          <div key={row.original._id}>{row?.original.category?.name}</div>
        ),
      },
      {
        accessorKey: "brand",
        header: "Brand",
        flex: 1,
        Cell: ({ row }) => (
          <div key={row.original._id}>{row?.original?.brand?.name}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 50,
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
        form={<ProductForm SendData={[]} type="add" />}
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
          content={<ProductForm SendData={sendData} type="edit" />}
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
