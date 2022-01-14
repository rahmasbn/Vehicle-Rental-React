import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
import cameraIcon from "../../assets/icons/camera-icon.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./addVehicle.css";

function AddVehicle() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <header className="addVehicle-header">
          <div className="img-arrow">
            <Link to="reservation">
              <img src={leftArrowIcon} alt="left arrow" />
            </Link>
          </div>
          <div className="addVehicle-text">
            <h1 className="mb-8">Add new item</h1>
          </div>
        </header>
      </div>
      <div className="container">
        <div className="add-vehicle-wrapper">
          <div className="add-item-vehicle">
            <div className="add-container">
              <div className="add-image-vehicle">
                <img
                  src={cameraIcon}
                  alt="camera icon"
                  className="cameraIcon"
                />
                <p>Click to add image</p>
              </div>
              <div className="add-image-vehicle">
                <div className="inside-wrapper-add-vehicle">
                  <div className="vehicle-slider">
                    <img
                      src={cameraIcon}
                      alt="camera icon"
                      className="icon-camera"
                    />
                    <p>Click to add image</p>
                  </div>
                  <div className="vehicle-slider">
                    <h1>+</h1>
                    <p className="add-more">Add more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="add-item-vehicle">
            <form className="add-vehicle"> 
                <input type="text" name="name" placeholder="Name (max up to 50 words)"/>
                <input type="text" name="location" placeholder="Location"/>
                <input type="text" name="description" placeholder="Description"/>
                <div className="price-vehicle">
                    <label htmlFor="price" className="label-price">Price :</label>
                <input type="text" name="price" placeholder="Type the price"/>
                </div>
                <div className="status-vehicle">
                    <label htmlFor="status" className="label-status">Status :</label>
                <input type="text" name="price" placeholder="Type the price"/>
                </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddVehicle;
