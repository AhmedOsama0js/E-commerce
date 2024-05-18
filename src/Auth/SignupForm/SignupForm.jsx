import css from "../MainAuth.module.css";
import { IoIosPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useFormik } from "formik";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Store/authSlice";
import ErrorModel from "../../Model/errorModel/ErrorModel";
import { useNavigate } from "react-router-dom";
import { signupFormValid } from "../../Util/ValidationForm";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

export default function SignupForm() {
  const navigate = useNavigate();
  const { loading, error, complete } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();

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
      imageProfile: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },

    validationSchema: signupFormValid,
    onSubmit: async (values) => {
      try {
        dispatch(signup(values));
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  if (complete) {
    navigate("/login");
  }
  return (
    <div className={css.form}>
      <h1>Create Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.imgContainer}>
          {formik.touched.imageProfile && formik.errors.imageProfile && (
            <div className={css.error}>{formik.errors.imageProfile}</div>
          )}
          {img && <img src={img} alt="Img" />}
          <div>
            <label className={css.customFileInput} htmlFor="imageProfile">
              <MdAdd />
            </label>
            <input
              type="file"
              id="imageProfile"
              name="imageProfile"
              accept=".png, .jpg, .jpeg"
              onChange={fileChange}
            />
          </div>
        </div>
        {formik.touched.name && formik.errors.name && (
          <div className={css.error}>{formik.errors.name}</div>
        )}
        <div className={css.inputContainer}>
          <span>
            <IoIosPerson />
          </span>
          <input
            type="name"
            placeholder="Name"
            id="name"
            name="name"
            {...formik.getFieldProps("name")}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className={css.error}>{formik.errors.email}</div>
        )}
        <div className={css.inputContainer}>
          <span>
            <MdEmail />
          </span>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className={css.error}>{formik.errors.password}</div>
        )}
        <div className={css.inputContainer}>
          <span>
            <FaLock />
          </span>
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            {...formik.getFieldProps("password")}
          />
        </div>
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <div className={css.error}>{formik.errors.passwordConfirm}</div>
        )}
        <div className={css.inputContainer}>
          <span>
            <FaLock />
          </span>
          <input
            placeholder="Password Confirm"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            autoComplete="new-password"
            {...formik.getFieldProps("passwordConfirm")}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
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
      <Link to="/login" title="Login">
        <FaLongArrowAltLeft /> Login Account
      </Link>
    </div>
  );
}
