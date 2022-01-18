import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
// import cameraIcon from "../../assets/icons/camera-icon.png";
import fixieGray from "../../assets/images/fixie-gray.webp";
import cancelIcon from "../../assets/icons/cancel.svg";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "../AddVehicle/addVehicle.css";
import "./editVehicle.css";

function EditVehicle() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <header className="addVehicle-header">
          <div className="img-arrow">
            <Link to="/reservation">
              <img src={leftArrowIcon} alt="left arrow" />
            </Link>
          </div>
          <div className="addVehicle-text">
            <h1 className="mb-8">Add new item</h1>
          </div>
        </header>
      </div>

      <div className="container">
        <div className="add-vehicle-container">
          <form>
            <div className="add-vehicle-wrapper">
              <div className="add-item-vehicle-1">
                <div className="add-container">
                  <div className="add-main-image-vehicle">
                    <div className="main-image">
                      <img
                        src={fixieGray}
                        alt="fixie"
                        className="vehicleImg"
                        style={{ width: "100%", height: "100%", borderRadius: "6px" }}
                      />
                      <div className="iconCancel d-flex">
                        <img
                          src={cancelIcon}
                          alt="cancel icon"
                          style={{
                            width: "20px",
                            height: "15px",
                            position: "absolute",
                          }}
                        />
                      </div>
                      {/* <p>Click to add image</p> */}
                    </div>
                  </div>
                  <div className="add-image-vehicle">
                    <div className="inside-wrapper-add-vehicle">
                      <div className="vehicle-slider">
                        <img
                          src={fixieGray}
                          alt="fixie"
                          className="vehicleImg"
                          style={{ width: "100%", height: "100%", borderRadius: "6px" }}
                        />
                        <div className="iconCancel-1 d-flex">
                        <img
                          src={cancelIcon}
                          alt="cancel icon"
                          style={{
                            position: "absolute",
                          }}
                        />
                      </div>
                        {/* <p>Click to add image</p> */}
                      </div>
                      <div className="vehicle-slider">
                      <img
                          src={fixieGray}
                          alt="fixie"
                          className="vehicleImg"
                          style={{ width: "100%", height: "100%", borderRadius: "6px" }}
                        />
                        <div className="iconCancel-2 d-flex">
                        <img
                          src={cancelIcon}
                          alt="cancel icon"
                          style={{
                            position: "absolute",
                          }}
                        />
                      </div>
                        {/* <p className="add-more">Add more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-vehicle">
                <div className="add-item-vehicle-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name (max up to 50 words)"
                  />
                  <input type="text" name="location" placeholder="Location" />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                  />
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
                      <option value="available" className="available">
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
                      <div className="btn sub-stock d-flex align-items-center">
                        -
                      </div>
                      <div className="number-stock mx-5">2</div>
                      <div className="btn add-stock d-flex align-items-center">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-edit-vehicle-wrapper d-flex flex-wrap">
              <div className="btn-edit-item mb-5 col-lg-4 col-md-4 col-sm-12 col-12">
                <select name="edit-item" id="edit-item" className="edit-item">
                  <option value="" disable="true" hidden>
                    Add item to
                  </option>
                  <option value="" className="choose-category" disabled>
                    Choose category
                  </option>
                  <option value="" className="select-cars">
                    Car
                  </option>
                  <option value="" className="select-motorbike">
                    Motorbike
                  </option>
                  <option value="" className="select-bike">
                    Bike
                  </option>
                  <option value="" className="select-add-category">
                    + Add category
                  </option>
                </select>
              </div>
              <div className="btn-edit-item mb-5 col-lg-4 col-md-4 col-sm-12 col-12">
                <button className="save-changes-vehicles">Save changes</button>
              </div>
              <div className="btn-edit-item mb-5 col-lg-3 col-md-3 col-sm-12 col-12">
                <button className="delete">Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditVehicle;
