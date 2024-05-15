import css from "../MainAuth.module.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useFormik } from "formik";
import { login } from "../../Store/authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ErrorModel from "../../Model/errorModel/ErrorModel";
import { loginFormValid } from "../../Util/ValidationForm";
import { useEffect } from "react";

export default function LoginForm() {
  const { records, loading, error, completeLogin } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (completeLogin) {
      Cookies.set("access_token", `${records.token}`, { expires: 7 });
        if (records?.data?.role === "admin" && Cookies.get("access_token")) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
    }
  } , [completeLogin, navigate, records, records.token])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValid,
    onSubmit: (values) => {
      try {
        dispatch(login(values));
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
  return (
    <div className={css.form}>
      <h1>User Login</h1>
      <form onSubmit={formik.handleSubmit}>
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
            autoComplete="new-email"
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
        <button type="submit" disabled={loading}>
          {loading ? "is Login..." : "login"}
        </button>
      </form>
      <Link to="/signup" title="Signup">
        Create Your Account <FaLongArrowAltRight />
      </Link>
      {error ? (
        <ErrorModel
          msg={error}
          loading={loading}
          error={error}
          complete={completeLogin}
        />
      ) : null}
      {loading ? (
        <ErrorModel
          msg={error}
          loading={loading}
          error={error}
          complete={completeLogin}
        />
      ) : null}
      {completeLogin ? (
        <ErrorModel
          msg={error}
          loading={loading}
          error={error}
          complete={completeLogin}
        />
      ) : null}
    </div>
  );
}
