import React from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
// import cameraIcon from "../../assets/icons/camera-icon.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./addVehicle.css";
import { postVehicle } from "../../utils/https/vehicles";
import { getCities } from "../../utils/https/city";


class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.inputFileRef1 = React.createRef();
    this.inputFileRef2 = React.createRef();
    this.inputFileRef3 = React.createRef();
    this.state = {
      counter: 1,
      selectedFile1: null,
      selectedFile2: null,
      selectedFile3: null,
      image1: require("../../assets/images/add-image.jpg"),
      image2: require("../../assets/images/add-image.jpg"),
      image3: require("../../assets/images/add-item.png"),
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
    console.log(this.state)
    const token = this.props.token;
    const body = new FormData();
    if (this.state.selectedFile1 !== null) {
      body.append(
        "imgVehicle",
        this.state.selectedFile1,
        this.state.selectedFile1.name
      );
      // console.log("file1")
    }
    if (this.state.selectedFile2 !== null) {
      body.append(
        "imgVehicle",
        this.state.selectedFile2,
        this.state.selectedFile2.name
      );
      // console.log("file2")

    }
    if (this.state.selectedFile3 !== null) {
      body.append(
        "imgVehicle",
        this.state.selectedFile3,
        this.state.selectedFile3.name
      );
      // console.log("file3")

    }
    body.append("name", e.target.name.value);
    body.append("capacity", e.target.capacity.value);
    body.append("stock", this.state.counter);
    body.append("price", e.target.price.value);
    body.append("status", e.target.status.value);
    body.append("type_id", e.target.category.value);
    body.append("city_id", e.target.location.value);

    // console.log(body.getAll("imgVehicle"))
    postVehicle(body, token)
      .then((res) => {
        console.log("response addVehicle", res.data.result);
        this.props.history.push("/vehicle/"+res.data.result.data.id);
        toast.success("Data added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Add vehicle is failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  componentDidMount() {
    getCities()
      .then((res) => {
        console.log("city", res.data.result);
        this.setState({
          city: res.data.result.result,
        });
      })
      .catch((err) => console.error("error city", err));
  }

  render() {
    const { image1, image2, image3, city } = this.state;
    return (
      <>
        <Header />
        <div className="container py-5">
          <header className="addVehicle-header">
            <div
              className="img-arrow"
              onClick={() => this.props.history.goBack()}
            >
              <img src={leftArrowIcon} alt="left arrow" />
            </div>
            <div className="addVehicle-text">
              <h1 className="mb-8">Add new item</h1>
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
                        alt="vehicles img"
                        onClick={() => this.inputFileRef1.current.click()}
                      />
                    </div>
                    <div className="add-image-vehicle">
                      <div className="inside-wrapper-add-vehicle">
                        <div className="vehicle-slider-1">
                          <img
                            src={image2}
                            alt="vehicles img"
                            onClick={() => this.inputFileRef2.current.click()}
                          />
                        </div>
                        <div className="vehicle-slider-2">
                          <img
                            src={image3}
                            alt="vehicles img"
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
                    />
                    {/* <input type="text" name="location" placeholder="Location" /> */}
                    <select
                      name="location"
                      id="location"
                      className="form-select-location"
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
                    <input type="text" name="capacity" placeholder="Capacity" />
                    <div className="price-vehicle">
                      <label htmlFor="price" className="label-price">
                        Price :
                      </label>
                      <input
                        type="text"
                        name="price"
                        placeholder="Type the price"
                      />
                    </div>
                    <div className="status-vehicle">
                      <p>Status :</p>
                      <select
                        name="status"
                        id="status"
                        className="form-select-status"
                      >
                        <option
                          value=""
                          disable="true"
                          hidden
                          className="select-status"
                        >
                          Select status
                        </option>
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
                        <div className="number-stock mx-5">
                          {this.state.counter}
                        </div>
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
              <div className="btn-add-vehicle-wrapper d-flex flex-wrap">
                <div className="btn-add-item mb-5 col-lg-4 col-md-4 col-sm-12 col-12">
                  <select name="category" id="add-item" className="add-item">
                    <option value="" disable="true" hidden>
                      Add item to
                    </option>
                    <option value="" className="choose-category" disabled>
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
                <div className="btn-add-item mb-5 col-lg-7 col-md-7 col-sm-12 col-12">
                  <button>Save item</button>
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

export default connect(mapStateToProps)(AddVehicle);
