import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import profilePic from "../../assets/images/girl-with-red-clothes.webp";
import iconEdit from "../../assets/icons/edit-profile.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { profile, editProfile } from "../../utils/https/users";
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
    show: false,
    // input: {},
    // errorMsg: {},
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

  // edit data profile
  submitHandler = (e) => {
    e.preventDefault();
    // const URL = process.env.REACT_APP_HOST + "/users/profile";
    // const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
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

    // axios
    //   .patch(URL, body, {
    //     headers: {
    //       "x-access-token": token,
    //     },
    //   })
    editProfile(body)
      .then((res) => {
        // console.log(res.data.result.result.image);
        const image = res.data.result.result.image;
        if (image !== null && typeof image !== "undefined") {
          localStorage.setItem("vehicle-rental-photoUser", image);
        }
        toast.success("Profile updated successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.getUserData();
      })
      .catch((err) => console.error(err));
  };

  // edit password
  // changeHandler = (e) => {
  //   let password = this.state.input;
  //   password[e.target.name] = e.target.value;
  //   this.setState({
  //     password,
  //   });
  // };

  // validation = (e) => {
  //   let msg = {};
  //   if (this.state.input["newPass"] !== this.state.input["confirmPass"]) {
  //     msg["confirmPass"] = "Password Doesn't Match";
  //   }
  //   this.setState({
  //     errorMsg: msg,
  //   });
  // };

  submitPasswordHandler = (e) => {
    e.preventDefault();
    // if(this.validation()) {
      const data = {
        currentPass: e.target.currentPass.value,
        newPass: e.target.newPass.value,
      };
      const URL = process.env.REACT_APP_HOST + "/users/edit-password";
      const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
  
      axios
        .patch(URL, data, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          console.log(res);
          // props.history.push("/login");

        })
        .catch((err) => {
          // let msg={}
          // msg["currentPass"]="Password is invalid";
          // this.setState({
          //   errorMsg: msg
          // })
          console.error(err)
        });
    // }
   
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
                    id="male"
                    defaultValue={1}
                    // defaultChecked={isMale}
                    checked={isMale}
                    onChange={this.handleChange}
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
                    id="female"
                    defaultValue={2}
                    // defaultChecked={!isMale}
                    checked={!isMale}
                    onChange={this.handleChange}
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
                  style={{ display: "none" }}
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
                  {/* <div className="modal-editPass"> */}
                  <button
                    type="button"
                    className="edit-pass"
                    onClick={() => {
                      this.setState({ show: !this.state.show });
                    }}
                  >
                    Edit Password
                  </button>
                  {/* <Modal
                      show={this.state.show}
                      className="modal-edit-password"
                      onHide={() => {
                        this.setState({ show: !this.state.show });
                      }}
                      ref={this.edit}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="mx-auto">
                          EDIT PASSWORD
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="modal-body-editPass">
                        <form
                          className="form-container"
                          onSubmit={this.submitPasswordHandler}
                        >
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
                          <label htmlFor="confirmPass" className="confirm-pass">
                            Confirm New Password :
                          </label>
                          <input
                            className="form-control confirm"
                            type="password"
                            name="confirmNewPass"
                          />
                          <div className="col-md-12 text-center mt-5 changePass">
                            <button type="submit" className="btn btn-warning">
                              Change Password
                            </button>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal> */}
                  {/* </div> */}
                  {/* <Link to="/edit-password"> */}
                  {/* </Link> */}
                  <button type="reset" className="cancel">
                    Cancel
                  </button>
                  {/* <ToastContainer/> */}

                </div>
              </div>
            </form>

            {/* Modal */}
            <div className="modal-editPass">
              <Modal
                show={this.state.show}
                className="modal-edit-password"
                onHide={() => {
                  this.setState({ show: !this.state.show });
                }}
                // ref={this.target}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="mx-auto">EDIT PASSWORD</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-editPass">
                  <form
                    className="form-container"
                    onSubmit={this.submitPasswordHandler}
                  >
                    <label htmlFor="currentPass" className="current-pass">
                      Current Password :
                    </label>
                    <input
                      className="form-control current mb-3"
                      type="password"
                      name="currentPass"
                      // value={this.state.input.currentPass}
                      // onChange={this.changeHandler}
                    />
                    {/* <div className="text-danger"></div> */}
                    <label htmlFor="newPass" className="new-pass">
                      New Password :
                    </label>
                    <input
                      className="form-control new"
                      type="password"
                      name="newPass"
                      // value={this.state.input.newPass}
                      // onChange={this.changeHandler}
                    />
                    <label htmlFor="confirmPass" className="confirm-pass">
                      Confirm New Password :
                    </label>
                    <input
                      className="form-control confirm"
                      type="password"
                      name="confirmNewPass"
                      // value={this.state.input.confirmNewPass}
                      // onChange={this.changeHandler}
                    />
                    <div className="col-md-12 text-center mt-5 changePass">
                      <button type="submit" className="btn btn-warning">
                        Change Password
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}


export default Profile;
