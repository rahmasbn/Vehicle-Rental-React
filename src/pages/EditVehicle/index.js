import React from "react";
// import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
// import cameraIcon from "../../assets/icons/camera-icon.png";
// import fixieGray from "../../assets/images/fixie-gray.webp";
// import cancelIcon from "../../assets/icons/cancel.svg";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "../AddVehicle/addVehicle.css";
import "./editVehicle.css";
import {
  deleteVehicle,
  getDetailVehicle,
  updateVehicle,
} from "../../utils/https/vehicles";
import { getCities } from "../../utils/https/city";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { logoutAction } from "../../redux/actions/auth";

class EditVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.inputFileRef1 = React.createRef();
    this.inputFileRef2 = React.createRef();
    this.inputFileRef3 = React.createRef();
    this.state = {
      counter: 1,
      detailVehicle: "",
      selectedFile1: null,
      selectedFile2: null,
      selectedFile3: null,
      image1: require("../../assets/images/default-cars.jpeg"),
      image2: require("../../assets/images/default-cars.jpeg"),
      image3: require("../../assets/images/default-cars.jpeg"),
      // imgVehicle1: typeof 'undefined',
      // imgVehicle2: typeof 'undefined',
      // imgVehicle3: typeof 'undefined',
      image: "",
      city: null,
    };
  }

  addCounter = () => {
    const newCounter = this.state.counter;
    this.setState({
      counter: newCounter + 1,
    });
  };

  subCounter = () => {
    const newCounter = this.state.counter;
    this.setState({
      counter: newCounter - 1 < 1 ? 1 : newCounter - 1,
    });
  };

  fileSelectedHandler1 = (e) => {
    // console.log(e.target.files[0]);
    const uploaded = e.target.files[0];
    this.setState({
      selectedFile1: e.target.files[0],
      image1: URL.createObjectURL(uploaded),
    });
  };

  fileSelectedHandler2 = (e) => {
    // console.log(e.target.files[0]);
    const uploaded = e.target.files[0];
    this.setState({
      selectedFile2: e.target.files[0],
      image2: URL.createObjectURL(uploaded),
    });
  };

  fileSelectedHandler3 = (e) => {
    // console.log(e.target.files[0]);
    const uploaded = e.target.files[0];
    this.setState({
      selectedFile3: e.target.files[0],
      image3: URL.createObjectURL(uploaded),
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const token = this.props.token;
    const vehicleId = this.state.detailVehicle.id;
    // console.log("id", vehicleId);
    const body = new FormData();

    console.log("img", this.state.selectedFile1);
    if (this.state.selectedFile1 !== null) {
      body.append(
        "imgVehicle",
        this.state.selectedFile1,
        this.state.selectedFile1.name
      );

      console.log("file1", this.state.selectedFile1);
    }
    if (this.state.selectedFile2 !== null) {
      body.append(
        "imgVehicle",
        this.state.selectedFile2,
        this.state.selectedFile2.name
      );
      // console.log("file2", this.state.selectedFile2);
    }
    if (this.state.selectedFile3 !== null) {
      body.append(
        "imgVehicle",
        this.state.selectedFile3,
        this.state.selectedFile3.name
      );
      // console.log("file3", this.state.selectedFile3);
    } else {
      body.append("imgVehicle", this.state.imgVehicle3);
    }

    body.append("name", e.target.name.value);
    body.append("capacity", e.target.capacity.value);
    body.append("stock", this.state.counter);
    body.append("price", e.target.price.value);
    body.append("status", e.target.status.value);
    body.append("type_id", e.target.category.value);
    body.append("city_id", e.target.location.value);

    updateVehicle(vehicleId, body, token)
      .then((res) => {
        console.log("response editVehicle", res.data);
        this.props.history.push("/vehicle/" + res.data.result.result.vehicleId);
        toast.success("Data updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data.err_code) {
          if (
            err.response.data.err_code === "TOKEN_EXPIRED" ||
            err.response.data.err_code === "INVALID_TOKEN"
          ) {
            this.props.dispatch(logoutAction());
            toast.warning("Token Expired");
          }
        } else {
          toast.error("Update vehicle is failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  onDelete = () => {
    const token = this.props.token;
    const vehicleId = this.state.detailVehicle.id;
    Swal.fire({
      icon: "warning",
      title: "Are you sure want to delete this item?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicle(vehicleId, token)
          .then((res) => {
            this.props.history.push("/");
            toast.success("Data deleted successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
          })
          .catch((err) => {
            console.error(err);
            toast.error("Delete data is failed", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      }
    });
  };

  componentDidMount() {
    const { match } = this.props;
    const vehicleId = match.params.id;
    // console.log('idveh', vehicleId)

    getDetailVehicle(vehicleId)
      .then((res) => {
        // console.log(JSON.parse(res.data.result[0].images)[1]);
        // console.log("detail", res.data.result[0]);
        const image = JSON.parse(res.data.result[0].images);
        // console.log('image', image[0])
        if (image[0] !== null && typeof image[0] !== "undefined") {
          this.setState({
            image1: process.env.REACT_APP_HOST + "/" + image[0],
            // imgVehicle1: image[0],
          });
        }
        if (image[1] !== null && typeof image[1] !== "undefined") {
          this.setState({
            image2: process.env.REACT_APP_HOST + "/" + image[1],
            // imgVehicle2: image[1],
          });
        }
        if (image[2] !== null && typeof image[2] !== "undefined") {
          this.setState({
            image3: process.env.REACT_APP_HOST + "/" + image[2],
            // imgVehicle3: image[2],
          });
        }
        this.setState({
          detailVehicle: res.data.result[0],
          counter: parseInt(res.data.result[0].stock),
          image: image,
        });
      })
      .catch((err) => console.error(err));

    getCities()
      .then((res) => {
        // console.log("city", res.data.result);
        this.setState({
          city: res.data.result.result,
        });
      })
      .catch((err) => console.error("error city", err));

    // console.log('detail', this.state.detailVehicle)
  }

  render() {
    const { counter, image1, image2, image3, city, detailVehicle, image } =
      this.state;
    console.log("image", image[0]);
    return (
      <>
        <Header />
        <div className="container py-5">
          <header className="addVehicle-header">
            <div className="img-arrow">
              <img
                src={leftArrowIcon}
                alt="left arrow"
                onClick={() => this.props.history.goBack()}
              />
            </div>
            <div className="addVehicle-text">
              <h1 className="mb-8">Edit item</h1>
            </div>
          </header>
        </div>

        <div className="container">
          <div className="add-vehicle-container">
            <form onSubmit={this.submitHandler}>
              <div className="add-vehicle-wrapper">
                <div className="add-item-vehicle-1">
                  <div className="add-container">
                    <div className="add-main-image-vehicle">
                      <img
                        src={image1}
                        alt="fixie"
                        className="vehicleImg"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "6px",
                        }}
                        onClick={() => this.inputFileRef1.current.click()}
                      />
                    </div>
                    <div className="add-image-vehicle">
                      <div className="inside-wrapper-add-vehicle">
                        <div className="vehicle-slider-1">
                          <img
                            src={image2}
                            alt="fixie"
                            className="vehicleImg"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "6px",
                            }}
                            onClick={() => this.inputFileRef2.current.click()}
                          />
                        </div>
                        <div className="vehicle-slider-2">
                          <img
                            src={image3}
                            alt="fixie"
                            className="vehicleImg"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "6px",
                            }}
                            onClick={() => this.inputFileRef3.current.click()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-vehicle">
                  <div className="add-item-vehicle-2">
                    <input
                      type="file"
                      onChange={this.fileSelectedHandler1}
                      ref={this.inputFileRef1}
                      style={{ display: "none" }}
                      multiple={true}
                    />
                    <input
                      type="file"
                      onChange={this.fileSelectedHandler2}
                      ref={this.inputFileRef2}
                      style={{ display: "none" }}
                    />
                    <input
                      type="file"
                      onChange={this.fileSelectedHandler3}
                      ref={this.inputFileRef3}
                      style={{ display: "none" }}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name (max up to 50 words)"
                      defaultValue={detailVehicle.name}
                    />
                    {/* <input type="text" name="location" placeholder="Location" /> */}
                    <select
                      name="location"
                      id="location"
                      className="form-select-location"
                      defaultValue={detailVehicle.city_id}
                    >
                      <option
                        value=""
                        disable="true"
                        hidden
                        className="select-status"
                      >
                        Select location
                      </option>
                      {city !== null &&
                        city.map((city, idx) => (
                          <option value={city.id} key={city.id}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                    <input
                      type="text"
                      name="capacity"
                      placeholder="Capacity"
                      defaultValue={detailVehicle.capacity}
                    />
                    <div className="price-vehicle">
                      <label htmlFor="price" className="label-price">
                        Price :
                      </label>
                      <input
                        type="text"
                        name="price"
                        placeholder="Type the price"
                        defaultValue={detailVehicle.price}
                      />
                    </div>
                    <div className="status-vehicle">
                      <p>Status :</p>
                      <select
                        name="status"
                        id="status"
                        className="form-select-status-edit"
                        defaultValue={detailVehicle.status}
                      >
                        {/* <option
                          value=""
                          disable="true"
                          hidden
                          className="select-status"
                        >
                          Select status
                        </option> */}
                        <option value="Available" className="available">
                          Available
                        </option>
                        <option value="full-booked" className="full-booked">
                          Full Booked
                        </option>
                      </select>
                    </div>
                    <div className="stock-vehicle mt-5 d-flex">
                      <p>Stock :</p>
                      <div className="counter-container mx-auto d-flex align-items-center">
                        <div
                          className="btn sub-stock d-flex align-items-center"
                          onClick={this.subCounter}
                        >
                          -
                        </div>
                        <div className="number-stock mx-5">{counter}</div>
                        <div
                          className="btn add-stock d-flex align-items-center"
                          onClick={this.addCounter}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-edit-vehicle-wrapper d-flex flex-wrap">
                <div className="btn-edit-item mb-5 col-lg-4 col-md-4 col-sm-12 col-12">
                  <select
                    name="category"
                    id="category"
                    className="edit-item"
                    defaultValue={detailVehicle.type_id}
                  >
                    <option disable="true" hidden>
                      Add item to
                    </option>
                    <option className="choose-category" disabled>
                      Choose category
                    </option>
                    <option value="1" className="select-cars">
                      Car
                    </option>
                    <option value="2" className="select-motorbike">
                      Motorbike
                    </option>
                    <option value="3" className="select-bike">
                      Bike
                    </option>
                    {/* <option value="" className="select-add-category">
                      + Add category
                    </option> */}
                  </select>
                </div>
                <div className="btn-edit-item mb-5 col-lg-4 col-md-4 col-sm-12 col-12">
                  <button className="save-changes-vehicles" type="submit">
                    Save changes
                  </button>
                </div>
                <div className="btn-edit-item mb-5 col-lg-3 col-md-3 col-sm-12 col-12">
                  <button
                    className="delete"
                    type="button"
                    onClick={this.onDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
  };
};

export default connect(mapStateToProps)(EditVehicle);
