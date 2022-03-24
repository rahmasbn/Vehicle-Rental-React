import React, { useState, useEffect } from "react";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";
import { forgotPassword, verifyOTP } from "../../utils/https/auth";
import ResetPassword from "./ResetPassword";

function VerifyOtp() {
  const style = {
    className: PinInput,
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginRight: "10px",
      marginBottom: "5px",
      MozAppearance: "textfield",
      width: "50px",
      borderRadius: "6px",
      fontSize: "25px",
      height: "50px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid #6d7499",
      textAlign: "center",
    },
  };
  const [isReset, setIsReset] = useState(false);
  const [otp, setOtp] = useState(0);
  const [count, setCount] = useState(60); //seconds
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  const secondsToTime = (secs) => {
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      m: minutes,
      s: seconds,
    };
  };

  const handleChange = (e) => {
    setOtp(e);
    // console.log(this.state.otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = JSON.parse(localStorage["email-user"]);

    const body = {
      email: email,
      otp: otp,
    };

    // setIsReset(true);
    verifyOTP(body)
      .then((res) => {
        const code = otp;
        localStorage.setItem("otp", JSON.stringify(code));
        setIsReset(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid OTP", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      });
  };

  const resendOtp = () => {
    const email = JSON.parse(localStorage["email-user"]);
    const body = {
      email: email,
    };
    // setCount(60);

    forgotPassword(body)
      .then((res) => {
        // console.log(res);
        setCount(60);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log("timeout");
    }
  }, [count]);

  return (
    <>
      {!isReset ? (
        <>
          <div className="container">
            <div className="forgotPass-title">
              <h1>Verification Code</h1>
              <p>Please enter the verification code to verify your account.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-otp">
              <PinInput
                length={6}
                type="numeric"
                inputMode="number"
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                autoSelect={true}
                onChange={handleChange}
                {...style}
              />
            </div>
            <div className="send-link">
              <button type="submit" className="send-link">
                Confirm
              </button>
            </div>
          </form>
          <p className="forgotPass-countdown">
            {minute < 9 ? "0" + minute : minute} :{" "}
            {second < 9 ? "0" + second : second}
          </p>
          {count === -1 && (
            <>
              <p className="text-center text-white">
                If you haven't received any code, click resend link
              </p>
              <div className="resend-link">
                <button
                  type="button"
                  className="resend-link"
                  onClick={resendOtp}
                >
                  Resend Link
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <ResetPassword />
      )}
    </>
  );
}

export default VerifyOtp;
