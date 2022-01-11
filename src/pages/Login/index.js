import React from "react";
import { Link } from "react-router-dom";

import google from "../../assets/images/google-logo.png";

import Footer from "../../components/Footer/index";
import { login } from "../../utils/https/auth";
import "./login.css";

function Login(props) {
  // console.log(process.env.REACT_APP_HOST);
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    login(body)
      .then((res) => {
        // console.log(res.data.result.token);
        const token = res.data.result.token;
        const idUser = res.data.result.id;
        const roleUser = res.data.result.roles;

        localStorage.setItem("vehicle-rental-token", JSON.stringify(token));
        localStorage.setItem("vehicle-rental-idUser", JSON.stringify(idUser));
        localStorage.setItem("vehicle-rental-roleUser", JSON.stringify(roleUser));

        props.history.push("/");
        // navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="grid-container-login-register">
        <div className="grid-item left">
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
        <span></span>
        <div className="grid-item right">
          <form onSubmit={submitHandler}>
            <div className="body-login">
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
            <Link to="/forgot-password">
              <p>Forget password?</p>
            </Link>
            <div className="login">
              {/* <Link to="/"> */}
              <button type="submit" className="login">
                Login
              </button>
              {/* </Link> */}
            </div>
            <div className="login-google">
              <Link to="#">
                <button
                  type="submit"
                  className="login-google"
                  style={{ color: "black" }}
                >
                  <img src={google} alt="logo google" width={20} height={20} />
                  Login with Google
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
