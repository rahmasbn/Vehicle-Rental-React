import React, { Component } from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./editPass.css";

class editPass extends Component {
  render() {
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
            <div className="form-container">
            {/* <p>INPUT YOUR EMAIL & PASSWORD</p> */}
            <label htmlFor="currentPass" className="current-pass">Current Password :</label>
            <input className="form-control current mb-3" type="password" name="current-pass" />
            <label htmlFor="newPass" className="new-pass">New Password :</label>
            <input className="form-control new"  type="password" name="new-pass"/>
            <div className="col-md-12 text-center mt-5 changePass">
              <button type="button" className="btn btn-warning">
                Change Password
              </button>
            </div>
          </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default editPass;
