import React from "react";
import profilePic from "../../assets/images/girl-with-red-clothes.webp";
import iconEdit from "../../assets/images/edit-profile.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./profile.css";

function Profile() {
  return (
    <div>
      <Header />

      <div className="container-fluid py-5 d-flex">
        <div className="container profile-title">
          <h1 className="mb-8">Profile</h1>

          <section className="profile-pic">
            <img
              src={profilePic}
              className="rounded-circle img-profile"
              alt="girl-with-red-clothes"
            />
            <img src={iconEdit} alt="icon edit" className="icon-edit" />
          </section>

          <section className="profile">
            <h2 className="text-center">Samantha Doe</h2>
            <p className="text-center">samanthadoe@mail.com</p>
            <p className="text-center phone">+62833467823</p>
            <p className="text-center status">Has been active since 2013</p>
          </section>

          <section className="radio-button">
            <form>
              <div className="form-check form-check-inline radioButton1">
                <input
                  className="radio-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                />
                <label className="radio-label" htmlFor="inlineRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline radioButton2">
                <input
                  className="radio-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                />
                <label className="radio-label" htmlFor="inlineRadio2">
                  Female
                </label>
              </div>
            </form>
          </section>

          <section className="contacts">
            <h3>Contacts</h3>
            <div className="form-group">
              <form>
                <label htmlFor="email" className="form-label">
                  Email address :
                </label>
                <input type="email" className="form-control" />
                <label htmlFor="address" className="form-label">
                  Address :
                </label>
                <input type="text" className="form-control" />
                <label htmlFor="phone" className="form-label">
                  Mobile number :
                </label>
                <input type="text" className="form-control" />
              </form>
            </div>
          </section>

          <section className="identity">
            <h3>Identity</h3>
            <form>
              <div className="row">
                <div className="col-sm-6 space">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Display name :
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6 space">
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">
                      DD/MM/YYYY
                    </label>
                    <input type="date" className="form-control date mt-3" />
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      <div className="container">
        <div className="btn-wrapper">
          <button type="submit" className="save ">
            Save Changes
          </button>
          <button type="button" className="edit-pass">
            Edit Password
          </button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
