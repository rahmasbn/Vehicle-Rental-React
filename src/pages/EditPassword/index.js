// import React, { Component } from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./editPass.css";
import axios from "axios";

function editPass(props)  {

 const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      currentPass: e.target.currentPass.value,
      newPass: e.target.newPass.value,
    };
    const URL = process.env.REACT_APP_HOST + "/users/edit-password";
    const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));

    axios
      .patch(URL, body, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res)
        // props.history.push("/login");
      })
      .catch((err) => console.error(err));
  };
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="edit-pass-wrapper">
            <div className="container py-5">
              <header className="editPass-header d-flex">
                <div className="img-arrow">
                  <Link to="/profile">
                    <img src={leftArrowIcon} alt="left arrow" />
                  </Link>
                </div>
                <div className="editPass-text mx-5">
                  <h1>Back</h1>
                </div>
              </header>
            </div>
            <h1>EDIT PASSWORD</h1>
            <form className="form-container" onSubmit={submitHandler}>
              <label htmlFor="currentPass" className="current-pass">
                Current Password :
              </label>
              <input
                className="form-control current mb-3"
                type="password"
                name="currentPass"
              />
              <label htmlFor="newPass" className="new-pass">
                New Password :
              </label>
              <input
                className="form-control new"
                type="password"
                name="newPass"
              />
              <div className="col-md-12 text-center mt-5 changePass">
                <button type="submit" className="btn btn-warning">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </>
    );
}

export default editPass;
