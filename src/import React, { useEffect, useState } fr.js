import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import google from "../../assets/icons/google-logo.png";

import Footer from "../../components/Footer/index";
import { register } from "../../utils/https/auth";
import "./register.css";

function Register(props) {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

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
  };

  return (
    <div>
      <div className="grid-container-login-register">
        <div className="grid-item left">
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
        <span></span>
        <div className="grid-item right">
          <form onSubmit={submitHandler}>
            <div className="body-register">
              <label htmlFor="name" className="form-label"></label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                // required
              />
              <label htmlFor="email" className="form-label"></label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                // required
              />
              <label htmlFor="password" className="form-label"></label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                // required
              />
            </div>
            <div className="register">
              {/* <Link to="/login"> */}
              <button type="submit" className="register">
                Sign Up
              </button>
              {/* </Link> */}
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
      <Footer />
    </div>
  );
}

export default Register;
