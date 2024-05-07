import css from "./InfoAdmin.module.css";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import ErrorModel from "../../../Model/errorModel/ErrorModel";
import { editMyData } from "../../../Store/getMeSlice";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { getMeFormValid } from "../../../Util/ValidationForm";

export default function InfoAdmin() {
  const { records, loading, error, complete } = useSelector(
    (state) => state.me
  );
  const [img, setImg] = useState(records?.data?.imageProfile);
  const dispatch = useDispatch();
  const formData = new FormData();

  const fileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgs = URL.createObjectURL(file);
      setImg(imgs);
      formik.setFieldValue("imageProfile", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: records?.data?.name,
      phone: `0${records?.data?.phone}`,
      imageProfile: records?.data?.imageProfile,
    },
    validationSchema: getMeFormValid,
    onSubmit: async (values) => {
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("imageProfile", values.imageProfile);

      try {
        if (typeof values.imageProfile === "object") {
          dispatch(editMyData(formData));
        } else if (typeof values.imageProfile === "string") {
          formData.delete("imageProfile");
          dispatch(editMyData(formData));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleReset = () => {
    formik.resetForm({
      values: {
        name: "",
        imageProfile: "",
        phone: "",
      },
    });
  };

  return (
    <form
      className={css.form}
      onSubmit={formik.handleSubmit}
      onReset={handleReset}
    >
      <div className={css.image}>
        <img src={img} alt="MyPhoto" />
        <div>
          <label className={css.customFileInput} htmlFor="image">
            <IoAdd />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={fileChange}
          />
        </div>
      </div>
      <div className={css.info}>
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
          <label htmlFor="phone">
            Phone
            {formik.touched.phone && formik.errors.phone && (
              <span className={css.error}>{formik.errors.phone}</span>
            )}
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            {...formik.getFieldProps("phone")}
          />
        </div>
        <div className={css.btns}>
          <button disabled={loading} className="button" type="submit">
            {loading ? "Sending..." : "Send"}
          </button>
          <button className="button" type="reset">
            reset
          </button>
          {error ? (
            <ErrorModel
              msg={error}
              loading={loading}
              error={error}
              complete={complete}
            />
          ) : null}
          {/* {complete ? (
          <ErrorModel
            msg={error}
            loading={loading}
            error={error}
            complete={complete}
          />
        ) : null} */}
          {loading ? (
            <ErrorModel
              msg={error}
              loading={loading}
              error={error}
              complete={complete}
            />
          ) : null}
        </div>
      </div>
    </form>
  );
}
