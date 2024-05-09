import { useEffect, useState } from "react";
import css from "../mainStyleForm.module.css";
import { useFormik } from "formik";
import { subcategoryFormValid } from "../../../Util/ValidationForm";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../../Store/categorySlice";
import {
  addSubcategory,
  editSubcategory,
} from "../../../Store/subcategorySlice";

export default function SubcategoryForm({ type, SendData, loading }) {
  const [img, setImg] = useState(SendData?.image || null);
  const { records } = useSelector((state) => state?.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const fileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imgs = URL.createObjectURL(file);
      setImg(imgs);
      formik.setFieldValue("image", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: SendData?.name || "",
      image: SendData?.image || null,
      category: SendData?.category?._id || "",
    },
    validationSchema: subcategoryFormValid,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("image", values.image);

      try {
        if (type === "edit") {
          if (typeof values.image === "object") {
            dispatch(editSubcategory([SendData?._id, formData]));
          }
          if (typeof values.image === "string") {
            // Object.keys(values).forEach((key) => {
            //   if (values[key] === null) {
            //     delete values[key];
            //   }
            // });
            formData.delete("image");
            dispatch(editSubcategory([SendData?._id, formData]));
          }
        }
        if (type === "add") {
          dispatch(addSubcategory(formData));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleReset = () => {
    formik.setValues({
      name: "",
    });
    setImg(null);
  };

  return (
    <div className={css.container}>
      <h3>Category</h3>
      <form onSubmit={formik.handleSubmit} onReset={handleReset}>
        <div className={css.ContentForm}>
          <div className={css.imgContainer}>
            {img && <img src={img} alt="Img" />}
            <div>
              <label className={css.customFileInput} htmlFor="image">
                Add New Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={fileChange}
              />
              {formik.touched.image && formik.errors.image && (
                <div className={css.error}>{formik.errors.image}</div>
              )}
            </div>
          </div>
          <div className={css.containerForm}>
            <div className={css.boxInput}>
              <label htmlFor="name">
                Name
                {formik.touched.name && formik.errors.name && (
                  <span className={css.error}>{formik.errors.name}</span>
                )}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                {...formik.getFieldProps("name")}
              />
            </div>
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
                <option>choose one</option>
                {records?.data ? (
                  records?.data?.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="not">Not Data</option>
                  </>
                )}
              </select>
            </div>
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
