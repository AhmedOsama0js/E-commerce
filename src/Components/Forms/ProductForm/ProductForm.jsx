import React, { useEffect, useState } from "react";
import css from "./Product.module.css";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../../Store/categorySlice";
import { getSubcategory } from "../../../Store/subcategorySlice";
import { getBrand } from "../../../Store/brandSlice";
import { IoIosClose } from "react-icons/io";
import { addProducts } from "../../../Store/productSlice";
import { productFormValid } from "../../../Util/ValidationForm";

export default function ProductForm({ SendData, type,loading }) {
  const [coverImage, setCoverImage] = useState(SendData?.imageCover || null);
  const [Images, setImages] = useState(SendData?.images || []);
  const [valueImages, setValueImages] = useState(SendData?.images || []);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorsArray, setSelectedColorsArray] = useState(
    SendData?.colors || []
  );
  const IntState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSubcategory());
    dispatch(getBrand());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: SendData?.title || "",
      colors: SendData?.colors || [],
      description: SendData?.description || "",
      imageCover: SendData?.imageCover || null,
      images: SendData?.images || [],
      price: SendData?.price || 0,
      priceAfterDiscount: SendData?.priceAfterDiscount || 0,
      quantity: SendData?.quantity || 0,
      // ratingQuantity: SendData?.ratingQuantity || "",
      category: SendData?.category?._id || "",
      subCategory: SendData?.subCategory?.[0]?._id || "",
      brand: SendData?.brand?._id || "",
    },

    validationSchema: productFormValid,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      values.colors.forEach((color) => formData.append("colors", color));
      formData.append("description", values.description);
      formData.append("imageCover", values.imageCover);
      values.images.forEach((image) => formData.append("images", image));
      formData.append("price", values.price);
      formData.append("priceAfterDiscount", values.priceAfterDiscount);
      formData.append("quantity", values.quantity);
      formData.append("subCategory", values.subCategory);
      formData.append("title", values.title);

      try {
        if (type === "add") {
          await dispatch(addProducts(formData));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("colors", selectedColorsArray);
    formik.setFieldValue("images", valueImages);
  }, [selectedColorsArray, valueImages]);

  const handleColorChange = (e) => {
    const selectedHexColor = e.target.value;
    setSelectedColor(selectedHexColor);
  };

  const handleChooseButtonClick = () => {
    setSelectedColorsArray((prevColors) => {
      if (
        !prevColors.includes(selectedColor) &&
        selectedColorsArray.length < 5
      ) {
        return [...prevColors, selectedColor];
      }
      return prevColors;
    });
  };

  const imageCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setCoverImage(imgUrl);
      formik.setFieldValue("imageCover", file);
    }
  };

  const deleteImage = (index) => {
    const updatedImages = Images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValueImages(updatedImages);
    formik.setFieldValue("images", updatedImages);
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (file && Images.length < 4) {
      const imgUrl = URL.createObjectURL(file);
      setImages((prevImages) => [...prevImages, imgUrl]);
      setValueImages((prevImages) => [...prevImages, file]);
      formik.setFieldValue("images", valueImages);
    }
  };

  const handleReset = () => {
    formik.resetForm({
      values: {
        title: "",
        colors: [],
        description: "",
        coverImage: null,
        images: [],
        price: 0,
        priceAfterDiscount: 0,
        quantity: 0,
        // ratingQuantity: 0,
        category: SendData?.category[0] || "",
        subCategory: SendData?.subCategory?.[0] || "",
        brand: SendData?.brand[0] || "",
      },
    });
    setCoverImage(null);
    setImages(null);
    setSelectedColorsArray([]);
    setValueImages([]);
  };

  const handleRemoveButtonClick = (colorToRemove) => {
    setSelectedColorsArray((prevColors) =>
      prevColors.filter((color) => color !== colorToRemove)
    );
  };
  return (
    <div className={css.container}>
      <h3>Product</h3>
      <form onSubmit={formik.handleSubmit} onReset={handleReset}>
        <div className={css.imgContainer}>
          <div className={css.imageCover}>
            {coverImage && <img src={coverImage} alt="Cover" />}
            <label className={css.customFileInput} htmlFor="coverImage">
              Add Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept=".png, .jpg, .jpeg"
              onChange={imageCoverChange}
            />
            {formik.touched.coverImage && formik.errors.coverImage && (
              <div className={css.error}>{formik.errors.coverImage}</div>
            )}
          </div>
          <div className={css.imageBox}>
            <div className={css.images}>
              {Images?.map((img, index) => (
                <div className={css.container} key={index}>
                  <img src={img} alt={`a ${index}`} />
                  <span
                    id={index}
                    className={css.close}
                    onClick={() => deleteImage(index)}
                  >
                    <IoIosClose />
                  </span>
                </div>
              ))}
            </div>
            <label className="button" htmlFor="images">
              Add Image
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept=".png, .jpg, .jpeg"
              onChange={addImage}
            />
          </div>
        </div>
        <div className={css.ContentForm}>
          <div className={css.mainText}>
            <div>
              <div className={css.boxInput}>
                <label htmlFor="title">
                  Title
                  {formik.touched.title && formik.errors.title && (
                    <span className={css.error}>{formik.errors.title}</span>
                  )}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  {...formik.getFieldProps("title")}
                />
              </div>
              <div className={css.prices}>
                <div className={css.boxInput}>
                  <label htmlFor="price">
                    Price
                    {formik.touched.price && formik.errors.price && (
                      <span className={css.error}>{formik.errors.price}</span>
                    )}
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    {...formik.getFieldProps("price")}
                  />
                </div>
                <div className={css.boxInput}>
                  <label htmlFor="quantity">
                    Quantity
                    {formik.touched.quantity && formik.errors.quantity && (
                      <span className={css.error}>
                        {formik.errors.quantity}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    {...formik.getFieldProps("quantity")}
                  />
                </div>
                <div className={css.boxInput}>
                  <label htmlFor="discount">
                    Discount
                    {formik.touched.priceAfterDiscount &&
                      formik.errors.priceAfterDiscount && (
                        <span className={css.error}>
                          {formik.errors.priceAfterDiscount}
                        </span>
                      )}
                  </label>
                  <input
                    type="number"
                    id="priceAfterDiscount"
                    name="priceAfterDiscount"
                    {...formik.getFieldProps("priceAfterDiscount")}
                  />
                </div>
              </div>
            </div>
            <div className={css.boxInput}>
              <label htmlFor="description">
                Description
                {formik.touched.description && formik.errors.description && (
                  <span className={css.error}>{formik.errors.description}</span>
                )}
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                {...formik.getFieldProps("description")}
              ></textarea>
            </div>
          </div>
          <div className={css.selector}>
            <div className={css.boxInput}>
              <label htmlFor="category">
                Category
                {formik.touched.category && formik.errors.category && (
                  <span className={css.error}>{formik.errors.category}</span>
                )}
              </label>
              <select
                id="category"
                name="category"
                {...formik.getFieldProps("category")}
                value={formik.values.category}
              >
                <option>Choose</option>
                {IntState?.category?.records?.data ? (
                  IntState?.category?.records?.data?.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.name}
                    </option>
                  ))
                ) : (
                  <option value="not">Not Data</option>
                )}
              </select>
            </div>
            <div className={css.boxInput}>
              <label htmlFor="subCategory">
                Subcategory
                {formik.touched.subCategory && formik.errors.subCategory && (
                  <span className={css.error}>{formik.errors.subCategory}</span>
                )}
              </label>
              <select
                id="subCategory"
                name="subCategory"
                {...formik.getFieldProps("subCategory")}
                value={formik.values.subCategory}
              >
                <option>Choose</option>
                {IntState?.subcategory?.records?.data ? (
                  IntState?.subcategory?.records?.data?.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.name}
                    </option>
                  ))
                ) : (
                  <option value="not">Not Data</option>
                )}
              </select>
            </div>
            <div className={css.boxInput}>
              <label htmlFor="brand">
                Brand
                {formik.touched.brand && formik.errors.brand && (
                  <span className={css.error}>{formik.errors.brand}</span>
                )}
              </label>
              <select
                id="brand"
                name="brand"
                {...formik.getFieldProps("brand")}
                value={formik.values.brand}
              >
                <option>Choose</option>
                {IntState?.brand?.records?.data ? (
                  IntState?.brand?.records?.data?.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.name}
                    </option>
                  ))
                ) : (
                  <option value="not">Not Data</option>
                )}
              </select>
            </div>
          </div>
          <div className={css.colors}>
            <span className="button" onClick={handleChooseButtonClick}>
              Choose
            </span>
            <div className={css.boxInput}>
              <label htmlFor="colors">
                colors
                {formik.touched.colors && formik.errors.colors && (
                  <span className={css.error}>{formik.errors.colors}</span>
                )}
              </label>
              <input
                type="color"
                id="colors"
                name="colors"
                value={selectedColor}
                onChange={handleColorChange}
              />
            </div>
            {selectedColorsArray?.map((color, index) => (
              <span
                onClick={() => handleRemoveButtonClick(color)}
                key={index}
                value={color}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                }}
              ></span>
            ))}
          </div>
        </div>
        <div className={css.btns}>
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
          <button className="button" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
