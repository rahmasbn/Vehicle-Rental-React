import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
import fixieGray from "../../assets/images/fixie-gray.webp";
import samanthaPic from "../../assets/images/girl-with-red-clothes.webp";
import cameraIcon from "../../assets/icons/camera-icon.png";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./message.css";

function ChatDetail() {
  return (
    <>
      <Header />

      <div className="container">
        <header className="info-user mb-5">
          <div className="img-arrow mx-4">
            <Link to="/message">
              <img src={leftArrowIcon} alt="left arrow" />
            </Link>
          </div>
          <div className="user-info d-flex">
            <img src={samanthaPic} alt="profile" className="rounded-circle" />
            <p>User 1</p>
          </div>
        </header>

        <div className="box">
          <div className="content-vehicle d-flex">
            <div className="vehicle-img col-lg-4 col-md-4 col-sm-5 col-6">
              <img src={fixieGray} alt="fixie gray" />
            </div>
            <div className="vehicle-info col-lg-8 col-md-8 col-sm-7 col-6">
              <h1>
                <strong>Fixie - Gray Only</strong>
              </h1>
              <h2>Yogyakarta</h2>
              <h3>Available</h3>
              <h4>Rp. 78.000/day</h4>
            </div>
          </div>
        </div>

        <div className="chat-content">
          <div className="right-chat">
            <div className="msg">
              <p>How many bike left?</p>
            </div>
            <p className="msg-time">Read [12.30 PM]</p>
          </div>
          <div className="left-chat">
            <div className="msg">
              <p>We only have 2 bikes left</p>
            </div>
            <p className="msg-time">12.30 PM</p>
          </div>

          <div className="chat-box">
            <input
              className="input-chat"
              type="text"
              placeholder="Type a message"
              aria-label="default input example"
            />
            <img src={cameraIcon} alt="camera" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ChatDetail;
