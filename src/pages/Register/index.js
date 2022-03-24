import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import google from "../../assets/icons/google-logo.png";

import Footer from "../../components/Footer/index";
import { validateSignup } from "../../helpers/validation";
import { register } from "../../utils/https/auth";
import "./register.css";

function Register(props) {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("far fa-eye-slash");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon("far fa-eye");
      setType("text");
    } else {
      setIcon("far fa-eye-slash");
      setType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError(validateSignup(values));
    const validateBody = validateSignup(values);
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (Object.keys(validateBody).length === 0) {
      setIsSubmit(true);
      setIsLoading(true);
      register(body)
        .then((res) => {
          // console.log(res.data);
          toast.success("Registration successful!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          props.history.push("/login");
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      console.log("isSubmit", isSubmit);
      console.log("useEff error", error);
    }
  });

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
              <p>Already have an account?</p>
            </div>
            <div className="signIn">
              <Link to="/login">
                <button type="button" className="signIn">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <span className="col-lg-1"></span>
          <div className="col-lg-5">
            <form onSubmit={submitHandler} noValidate>
              <div className="body-register">
                <div className="form-group">
                  <label htmlFor="name" className="form-label"></label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                {error.name && (
                  <div className="text-danger fw-bold error">{error.name}</div>
                )}
                <div className="form-group">
                  <label htmlFor="email" className="form-label"></label>
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
                    className={error.email ? "icon-toggle toggles" : "icon-toggle"}
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
              </div>
              <div className="register">
                {!isLoading ? (
                  <button type="submit" className="register">
                    Sign Up
                  </button>
                ) : (
                  <button type="submit" className="register">
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                )}
              </div>
              <div className="register-google">
                {/* <Link to="#"> */}
                <button
                  type="submit"
                  className="register-google"
                  style={{ color: "black" }}
                >
                  <img src={google} alt="logo google" width={20} height={20} />
                  Sign Up with Google
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
