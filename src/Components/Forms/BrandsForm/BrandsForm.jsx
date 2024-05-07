import { useState } from "react";
import css from "../mainStyleForm.module.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { brandFormValid } from "../../../Util/ValidationForm";
import { addBrand, editBrand } from "../../../Store/brandSlice";

export default function BrandsForm({ type, SendData, loading }) {
  const [img, setImg] = useState(SendData?.image || null);
  const dispatch = useDispatch();

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
    },
    validationSchema: brandFormValid,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);

      try {
        if (type === "edit") {
          if (typeof values.image === "object") {
            dispatch(editBrand([SendData._id, formData]));
          } else if (typeof values.image === "string") {
            formData.delete("image");
            dispatch(editBrand([SendData._id, formData]));
          }
        } else if (type === "add") {
          dispatch(addBrand(formData));
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
      <h3>Brand</h3>
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
          </div>
        </div>
        <div className={css.btns}>
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
          <button className="button" type="reset" disabled={loading}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
