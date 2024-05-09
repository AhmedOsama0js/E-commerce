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

export default function LoginForm() {
  const { records, loading, error, complete } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: categoryFormValid,
    onSubmit: (values) => {
      try {
        dispatch(login(values));
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  if (complete) {
    Cookies.set("access_token", `${records.token}`, { expires: 7 });
    if (records?.data?.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }

  return (
    <div className={css.form}>
      <h1>User Login</h1>
      <form onSubmit={formik.handleSubmit}>
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
    </div>
  );
}