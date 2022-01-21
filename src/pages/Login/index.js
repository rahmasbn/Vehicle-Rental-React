import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import google from "../../assets/icons/google-logo.png";

import Footer from "../../components/Footer/index";
// import { login } from "../../utils/https/auth";
import "./login.css";

class Login extends React.Component {
  submitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // login(body)
    //   .then((res) => {
    //     // console.log(res.data.result.image);
    //     const token = res.data.result.token;
    //     const photo = res.data.result.image;
    //     const roleUser = res.data.result.roles;

    //     localStorage.setItem("vehicle-rental-token", JSON.stringify(token));
    //     localStorage.setItem("vehicle-rental-photoUser", photo);
    //     localStorage.setItem("vehicle-rental-roleUser", roleUser);

    //     props.history.push("/");
    //     // navigate("/");
    //   })
    //   .catch((err) => console.error(err));

    this.props.dispatch(loginAction(body));
  };

  componentDidUpdate() {
    if (this.props.auth.isFulfilled === true) {
      localStorage["vehicle-rental-token"] = JSON.stringify(
        this.props.auth.userData.token
      );
      localStorage["vehicle-rental-photoUser"] = this.props.auth.userData.photo;
      localStorage["vehicle-rental-roleUser"] = this.props.auth.userData.role;
      toast.success("Login success", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      this.props.history.push("/");
    }
    // console.log('token', this.props.auth.userData.token)
  }

  render() {
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
            <form onSubmit={this.submitHandler}>
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

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
