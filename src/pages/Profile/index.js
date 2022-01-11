import React from "react";
// import profilePic from "../../assets/images/girl-with-red-clothes.webp";
import iconEdit from "../../assets/images/edit-profile.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./profile.css";
import axios from "axios";

class Profile extends React.Component {
  state = {
    userData: "",
    profilePic: require("../../assets/images/avatar.jpg"),
  };

  componentDidMount() {
    const idUser = localStorage.getItem("vehicle-rental-idUser");
    const URL = `http://localhost:8000/users/${idUser}`;
    axios
      .get(URL)
      .then((res) => {
        // console.log(res.data.result.data[0].dob);
        const moment = require('moment');
        let dob = moment(res.data.result.data[0].dob).format('YYYY-MM-DD');
        const result = {...res.data.result.data[0], dob};
        const image = res.data.result.data[0].image;
        
        // console.log('photo: ', image);
        if (image !== null) {
          this.setState({
            profilePic: `http://localhost:8000/${image}`,
          });
        }
        this.setState({
          userData: result
        })
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { name, email, dob, address, phone_number } = this.state.userData;
    const { profilePic } = this.state;
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
              <h2 className="text-center">{name}</h2>
              <p className="text-center">{email}</p>
              <p className="text-center phone">{phone_number}</p>
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
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    defaultValue={email}
                  />
                  <label htmlFor="address" className="form-label">
                    Address :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    defaultValue={address}
                  />
                  <label htmlFor="phone" className="form-label">
                    Mobile number :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    defaultValue={phone_number}
                  />
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
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        defaultValue={name}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 space">
                    <div className="form-group">
                      <label htmlFor="dob" className="form-label">
                        DD/MM/YYYY
                      </label>
                      <input
                        type="date"
                        className="form-control date mt-3"
                        name="dob"
                        defaultValue={dob}
                      />
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
}

export default Profile;
