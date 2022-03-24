import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import profilePic from "../../assets/images/girl-with-red-clothes.webp";
import iconEdit from "../../assets/icons/edit-profile.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { profile, editProfile, editPassword } from "../../utils/https/users";
import "./profile.css";
import { connect } from "react-redux";
import { logoutAction, updateUserPhoto } from "../../redux/actions/auth";
import Swal from "sweetalert2";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef(null);
    this.state = {
      userData: "",
      profilePic: require("../../assets/images/avatar.jpg"),
      selectedGender: "",
      selectedFile: null,
      show: false,
      input: {},
      errorMsg: {},
      isValid: false,
    };
  }

  getUserData = () => {
    const image = this.props.photo;
    const token = this.props.token;

    profile(token)
      .then((res) => {
        // console.log(res.data.result[0]);
        const moment = require("moment");
        let dob = moment(res.data.result[0].dob).format("YYYY-MM-DD");
        // console.log(dob)
        const result = { ...res.data.result[0], dob };

        if (image !== null) {
          this.setState({
            profilePic: process.env.REACT_APP_HOST + `/${image}`,
          });
        }
        this.setState({
          userData: result,
          selectedGender: res.data.result[0].gender_id,
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data.err_code) {
          if (
            err.response.data.err_code === 'TOKEN_EXPIRED' ||
            err.response.data.err_code === 'INVALID_TOKEN'
          ) {
            this.props.dispatch(logoutAction());
            toast.warning('Token Expired');
          }
        }
      });
  };

  componentDidMount() {
    this.getUserData();
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      selectedGender: parseInt(e.target.value),
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

    const body = new FormData();
    const token = this.props.token;
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

    editProfile(body, token)
      .then((res) => {
        // console.log(res.data.result.result.image);
        const image = res.data.result.result.image;
        if (image !== null && typeof image !== "undefined") {
          this.props.dispatch(updateUserPhoto(image));
        }
        toast.success("Profile updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.getUserData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // edit password
  changeHandler = (e) => {
    let input = this.state.input;
    input[e.target.name] = e.target.value;
    this.setState({
      input,
    });
  };

  validate = (e) => {
    let errors = {};
    let input = this.state.input;
    let isValid = true;

    if (
      typeof input["newPass"] !== "undefined" &&
      typeof input["confirmPass"] !== "undefined"
    ) {
      if (input["newPass"] !== input["confirmPass"]) {
        isValid = false;
        errors["confirmPass"] = "Passwords don't match";
      }
    }
    this.setState({
      errorMsg: errors,
    });
    return isValid;
  };

  submitPasswordHandler = (e) => {
    e.preventDefault();
    if (this.validate()) {
      let input = {};
      input["currentPass"] = "";
      input["newPass"] = "";
      input["confirmPass"] = "";
      this.setState({ input: input });

      const { currentPass, newPass } = this.state.input;
      // console.log(this.state.input);

      const data = {
        currentPass: currentPass,
        newPass: newPass,
      };
      const token = this.props.token;

      editPassword(data, token)
        .then((res) => {
          // console.log(res);
          // toast.success("Password Updated Successfully", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 3000,
          // });
          // this.props.dispatch(logoutAction());
          Swal.fire({
            icon: "success",
            title: "Password Updated Successfully",
            text: "Please login again to continue",
            showCancelButton: false,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              this.props.dispatch(logoutAction());
              this.props.history.push("/login");

              setTimeout(() => {
                window.location.reload(false);
              }, 5000);
            }
          });
        })
        .catch((err) => {
          let errors = {};
          errors["currentPass"] = "Password is invalid";
          this.setState({
            errorMsg: errors,
          });
          // console.error(err);
        });
    }
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
    // let isMale = false;
    // if (selectedGender === 1 || selectedGender === "1") isMale = true;
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
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = require("../../assets/images/default-img.png");
                }}
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
                    checked={selectedGender === 1}
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
                    checked={selectedGender === 2}
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
                  <button type="reset" className="cancel">
                    Cancel
                  </button>
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
                      value={this.state.input.currentPass || ""}
                      onChange={this.changeHandler}
                    />
                    <div className="text-danger mb-2">
                      {this.state.errorMsg.currentPass}
                    </div>
                    <label htmlFor="newPass" className="new-pass">
                      New Password :
                    </label>
                    <input
                      className="form-control new"
                      type="password"
                      name="newPass"
                      value={this.state.input.newPass || ""}
                      onChange={this.changeHandler}
                    />
                    <label htmlFor="confirmPass" className="confirm-pass">
                      Confirm New Password :
                    </label>
                    <input
                      className="form-control confirm"
                      type="password"
                      name="confirmPass"
                      value={this.state.input.confirmPass || ""}
                      onChange={this.changeHandler}
                    />
                    <div className="text-danger mb-2">
                      {this.state.errorMsg.confirmPass}
                    </div>
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    photo: state.auth.userData.photo,
  };
};

export default connect(mapStateToProps)(Profile);
