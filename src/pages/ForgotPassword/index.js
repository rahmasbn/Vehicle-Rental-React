import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import leftArrowIcon from "../../assets/icons/Vector.png";

import Footer from "../../components/Footer";
import { forgotPassword } from "../../utils/https/auth";
import "./forgotPass.css";
import VerifyOtp from "./VerifyOtp";

function ForgotPass() {
  const [isVerify, setIsVerify] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
    };
    forgotPassword(body)
      .then((res) => {
        // console.log(res);
        const email = res.data.result.data.email;
        localStorage.setItem("email-user", JSON.stringify(email));
        toast.success(
          "Verification code has been sent. Please check your email!",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
          }
        );
        setIsVerify(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container-fluid forget-password">
        <div className="container py-3">
          <header className="back">
            <div className="arrow-back">
              <Link to="/login">
                <img src={leftArrowIcon} alt="left arrow" />
              </Link>
            </div>
            <div className="back-title">
              <p className="mb-8">Back</p>
            </div>
          </header>
        </div>
        {!isVerify ? (
          <>
            <div className="container">
              <div className="forgotPass-title">
                <h1>Don't worry, we got your back!</h1>
                <p>
                  To reset your password, you must type your e-mail and we will
                  send a code to your email.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="body-forgotPass">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                />
              </div>
              <div className="send-link">
                <button type="submit" className="send-link">
                  Send Link
                </button>
              </div>
            </form>
          </>
        ) : (
          <VerifyOtp />
        )}
      </div>
      <Footer />
    </>
  );
}

export default ForgotPass;
