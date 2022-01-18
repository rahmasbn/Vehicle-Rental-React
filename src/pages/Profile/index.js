import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import profilePic from "../../assets/images/girl-with-red-clothes.webp";
import iconEdit from "../../assets/icons/edit-profile.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { profile } from "../../utils/https/users";
import "./profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef(null);
  }
  state = {
    userData: "",
    profilePic: require("../../assets/images/avatar.jpg"),
    selectedGender: "",
    selectedFile: null,
  };

  getUserData = () => {
    const image = localStorage.getItem("vehicle-rental-photoUser");

    profile()
      .then((res) => {
        // console.log(res.data.result[0]);
        const moment = require("moment");
        let dob = moment(res.data.result[0].dob).format("YYYY-MM-DD");
        // console.log(dob)
        const result = { ...res.data.result[0], dob };

        if (image !== "null") {
          this.setState({
            profilePic: process.env.REACT_APP_HOST + `/${image}`,
          });
        }
        this.setState({
          userData: result,
          selectedGender: res.data.result[0].gender_id,
        });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.getUserData();
  }

  handleChange = (e) => {
    this.setState({
      selectedGender: e.target.value,
    });
  };

  fileSelectedHandler = (e) => {
    // console.log(e.target.files[0]);
    const uploaded = e.target.files[0];
    this.setState({
      selectedFile: e.target.files[0],
      profilePic: URL.createObjectURL(uploaded),
    });
  };

  // edit data
  submitHandler = (e) => {
    e.preventDefault();
    const URL = process.env.REACT_APP_HOST + "/users/profile";
    const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
    const body = new FormData();
    if (this.state.selectedFile !== null) {
      body.append(
        "image",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    body.append("name", e.target.name.value);
    body.append("email", e.target.email.value);
    body.append("gender_id", this.state.selectedGender);
    body.append("address", e.target.address.value);
    body.append("phone_number", e.target.phone.value);
    body.append("dob", e.target.dob.value);

    axios
      .patch(URL, body, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        // console.log(res.data.result.result.image);
        const image = res.data.result.result.image;
        if (image !== null && typeof image !== "undefined") {
          localStorage.setItem("vehicle-rental-photoUser", image);
        }
        this.getUserData();
      })
      .catch((err) => console.error(err));
  };

  cancelHandler = (e) => {
    const image = this.state.userData.image;
    if (image !== null && typeof image !== "undefined") {
      this.setState({
        profilePic: process.env.REACT_APP_HOST + `/${image}`,
      });
    }
    this.setState({
      selectedGender: this.state.userData.gender_id,
    });
  };

  render() {
    const { name, email, dob, address, phone_number } = this.state.userData;
    const { profilePic, selectedGender } = this.state;
    let isMale = false;
    if (selectedGender === 1 || selectedGender === "1") isMale = true;
    // console.log("isMale ", isMale);
    // console.log("selectedGender ", typeof selectedGender, selectedGender);
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
              <img
                src={iconEdit}
                alt="icon edit"
                className="icon-edit"
                onClick={() => this.target.current.click()}
              />
            </section>

            <section className="profile">
              <h2 className="text-center">{name}</h2>
              <p className="text-center">{email}</p>
              <p className="text-center phone">{phone_number}</p>
              {/* <p className="text-center status">Has been active since 2013</p> */}
            </section>

            <section className="radio-button">
              <form>
                <div className="form-check form-check-inline radioButton1">
                  <input
                    className="radio-input"
                    type="radio"
                    name="gender"
                    id="gender"
                    defaultValue={1}
                    // defaultChecked={isMale}
                    checked={isMale}
                    onChange={this.handleChange.bind(this)}
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
                    id="gender"
                    defaultValue={2}
                    // defaultChecked={!isMale}
                    checked={!isMale}
                    onChange={this.handleChange.bind(this)}
                  />
                  <label className="radio-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
              </form>
            </section>

            <form
              className="contacts-identity"
              onSubmit={this.submitHandler}
              onReset={this.cancelHandler}
            >
              <section className="contacts">
                <input
                  type="file"
                  onChange={this.fileSelectedHandler}
                  ref={this.target}
                  style={{display: "none"}}
                />
                <h3>Contacts</h3>
                <div className="form-group">
                  {/* <form onSubmit={this.submitHandler.bind(this)}> */}
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
                  {/* </form> */}
                </div>
              </section>

              <section className="identity mt-5">
                <h3>Identity</h3>
                {/* <form> */}
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
                {/* </form> */}
              </section>

              <div className="container">
                <div className="btn-wrapper">
                  <button type="submit" className="save ">
                    Save Changes
                  </button>
                  <Link to="/edit-password">
                    <button type="button" className="edit-pass">
                      Edit Password
                    </button>
                  </Link>
                  <button type="reset" className="cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Profile;
