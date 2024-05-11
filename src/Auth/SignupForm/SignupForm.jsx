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
import {signupFormValid} from "../../Util/ValidationForm"

export default function SignupForm() {
  const navigate = useNavigate();
  const { loading, error, complete } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
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
