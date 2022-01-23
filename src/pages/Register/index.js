import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import google from "../../assets/icons/google-logo.png";

import Footer from "../../components/Footer/index";
import { register } from "../../utils/https/auth";
import "./register.css";

function Register(props) {

  const submitHandler = (e) => {
    e.preventDefault();
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
              <input type="text" placeholder="Name" name="name" required />
              <label htmlFor="email" className="form-label"></label>
              <input type="email" placeholder="Email" name="email" required />
              <label htmlFor="password" className="form-label"></label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </div>
            <div className="register">
              <button type="submit" className="register">
                Sign Up
              </button>
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
