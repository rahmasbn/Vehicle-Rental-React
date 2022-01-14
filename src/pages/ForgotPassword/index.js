import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/Vector.png";

import Footer from "../../components/Footer";
import "./forgotPass.css";

function ForgotPass() {
  return (
    <>
      <div className="container-fluid forget-password">
        <div className="container py-3">
          <header className="back">
            <div className="img-arrow">
              <Link to="/login">
                <img src={leftArrowIcon} alt="left arrow" />
              </Link>
            </div>
            <div className="back-title">
              <p className="mb-8">Back</p>
            </div>
          </header>
        </div>
        <div className="container">
          <div className="forgotPass-title">
            <h1>Don't worry, we got your back!</h1>
            {/* </div> */}
            {/* <div className="forgotPass-text"> */}
            <p>
              You will receive a link to reset your password.
              <br />
              If you haven't received any link, click resend link
            </p>
          </div>

          {/* <div className="container"> */}
        </div>
        <form>
          <div className="body-forgotPass">
            <label htmlFor="email" className="form-label"></label>
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              required
            />
          </div>
          <div className="send-link">
            <button type="submit" className="send-link">
              Send Link
            </button>
          </div>
          <div className="resend-link">
            {/* <Link to="#"> */}
            <button type="submit" className="resend-link">
              Resend Link
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      {/* </div> */}
      <Footer />
    </>
  );
}

export default ForgotPass;
