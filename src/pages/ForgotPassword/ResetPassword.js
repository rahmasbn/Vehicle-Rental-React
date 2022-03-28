import React, { useState } from "react";
import Swal from "sweetalert2";
import { resetPass } from "../../utils/https/auth";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const history = useHistory();
  const [input, setInput] = useState({
    pass: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState({});

  const [visible, setVisible] = useState({
    type1: "password",
    type2: "password",
  });
  const [icons, setIcons] = useState({
    icon1: "far fa-eye-slash",
    icon2: "far fa-eye-slash",
  });
  // const [isSubmit, setIsSubmit] = useState(false);

  const handleToggle1 = () => {
    if (visible.type1 === "password") {
      setIcons({
        ...icons,
        icon1: "far fa-eye",
      });
      setVisible({
        ...visible,
        type1: "text",
      });
    } else {
      setIcons({
        ...icons,
        icon1: "far fa-eye-slash",
      });
      setVisible({
        ...visible,
        type1: "password",
      });
    }
  };

  const handleToggle2 = () => {
    if (visible.type2 === "password") {
      setIcons({
        ...icons,
        icon2: "far fa-eye",
      });
      setVisible({
        ...visible,
        type2: "text",
      });
    } else {
      setIcons({
        ...icons,
        icon2: "far fa-eye-slash",
      });
      setVisible({
        ...visible,
        type2: "password",
      });
    }
  };

  const validate = () => {
    let errors = {};

    if (typeof input.pass !== "undefined") {
      const validPass = new RegExp(
        "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$"
      );
      if (!validPass.test(input.pass)) {
        errors["pass"] =
          "Password must be at least 6 characters, including lowercase, uppercase and numbers";
      }
    }

    if (
      typeof input.pass !== "undefined" &&
      typeof input.confirmPass !== "undefined"
    ) {
      if (input.pass !== input.confirmPass) {
        errors["confirmPass"] = "Passwords don't match";
      }
    }
    setErrors(errors);
    return errors;
  };

  const handlePassword = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = JSON.parse(localStorage["email-user"]);
    const otp = JSON.parse(localStorage["otp"]);
    const validateBody = validate();

    const body = {
      email: email,
      otp: otp,
      password: input.pass,
    };
    if (Object.keys(validateBody).length === 0) {
      // setIsSubmit(true);
      resetPass(body)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Password Reset Successfully",
            text: "Please login to continue",
            showCancelButton: false,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("email-user");
              localStorage.removeItem("otp");
              history.push("/login");

              setTimeout(() => {
                window.location.reload(false);
              }, 5000);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffectt(() => {
  //   // console.log(errors);
  //   if (Object.keys(errors).length === 0 && isSubmit) {
  //     console.log("isSubmit", isSubmit);
  //     console.log("useEff error", errors);
  //   }
  // }, [errors, isSubmit]);

  return (
    <>
      <div className="container">
        <div className="forgotPass-title">
          <h1>Reset Password</h1>
          <p>Type your password twice so we can confirm your new password</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="body-forgotPass">
          <input
            type={visible.type1}
            placeholder="Enter your new password"
            name="pass"
            value={input.pass}
            onChange={handlePassword}
          />
          {errors.pass && (
            <p className={`text-danger bg-white error-reset`}>{errors.pass}</p>
          )}
          <div className="toggle-reset1" onClick={handleToggle1}>
            <i className={icons.icon1}></i>
          </div>
          <input
            type={visible.type2}
            placeholder="Enter your confirm password"
            name="confirmPass"
            value={input.confirmPass}
            onChange={handlePassword}
          />
          {errors.confirmPass && (
            <p className={`text-danger bg-white error-reset`}>
              {errors.confirmPass}
            </p>
          )}
          <div
            className={
              errors.pass ? "toggle-reset2 toggle-error" : "toggle-reset2"
            }
            onClick={handleToggle2}
          >
            <i className={icons.icon2}></i>
          </div>
        </div>
        <div className="send-link">
          <button type="submit" className="send-link mb-5">
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
}

export default ResetPassword;
