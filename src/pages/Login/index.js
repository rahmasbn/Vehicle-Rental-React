import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/auth";
import { toast } from "react-toastify";
// import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import google from "../../assets/icons/google-logo.png";

import Footer from "../../components/Footer/index";
import { validateLogin } from "../../helpers/validation";
import "./login.css";

function Login(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("far fa-eye-slash");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError(validateLogin(values));
    const validateBody = validateLogin(values);

    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (Object.keys(validateBody).length === 0) {
      setIsSubmit(true);
      dispatch(loginAction(body));
    }
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      console.log("isSubmit", isSubmit);
      console.log("useEff error", error);
    }
    if (auth.isPending === true) {
      setIsFetching(true);
    }
    if (auth.isFulfilled === true) {
      toast.success("Login successful", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      setTimeout(() => props.history.push("/"), 5000);
    }
  }, [auth, error, isSubmit, props]);

  useEffect(() => {
    if (auth.isRejected === true) {
      setIsFetching(false);
      let errors = {};
      errors.form = "Email/Password is invalid";
      setError(errors);
    }
  }, [auth]);

  const handleToggle = () => {
    if (type === "password") {
      setIcon("far fa-eye");
      setType("text");
    } else {
      setIcon("far fa-eye-slash");
      setType("password");
    }
  };


  return (
    <>
      <div className="grid-container-login-register container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="title">
              <h1>
                Let's Explore <br />
                The World
              </h1>
            </div>
            <div className="text">
              <p>Don't have account?</p>
            </div>
            <div className="signUp">
              <Link to="/register">
                <button type="button" className="signUp">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          <span className="col-lg-1"></span>
          <div className="col-lg-5">
            <form onSubmit={submitHandler} noValidate>
              <div className="body-login">
                <div className="form-group">
                  <label htmlFor="email" className="form-label"></label>
                  {/* <i className="far fa-eye"></i> */}
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                {error.email && (
                  <div className="text-danger fw-bold error">{error.email}</div>
                )}
                <div className="form-group">
                  <label htmlFor="password" className="form-label"></label>
                  <input
                    type={type}
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <div
                    className={error.email ? "icon-style icons" : "icon-style"}
                    onClick={handleToggle}
                  >
                    <i className={icon}></i>
                  </div>
                </div>
                {error.password && (
                  <div className="text-danger fw-bold error">
                    {error.password}
                  </div>
                )}
                <Link to="/forgot-password">
                  <p>Forget password?</p>
                </Link>
              </div>
              {error.form && (
                <div className="text-danger fw-bold error text-center">
                  {error.form}
                </div>
              )}
              <div className="login">
                {/* <Link to="/"> */}
                {!isFetching ? (
                  <button type="submit" className="login">
                    Login
                  </button>
                ) : (
                  <button type="submit" className="login">
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                )}
                {/* </Link> */}
              </div>
              <div className="login-google">
                <Link to="#">
                  <button
                    type="submit"
                    className="login-google"
                    style={{ color: "black" }}
                  >
                    <img
                      src={google}
                      alt="logo google"
                      width={20}
                      height={20}
                    />
                    Login with Google
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
