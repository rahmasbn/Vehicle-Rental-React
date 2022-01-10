import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/images/left-arrow.png";
import fixieGray from "../../assets/images/fixie-gray.webp";
import heartIcon from "../../assets/images/yellow-heart.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
// import Counter from "../../components/Counter";
import "./reservation.css";

function Reservation() {
  return (
    <div>
      <Header />

      <div className="container py-5">
        <header className="reservation-title">
          <div className="img-arrow">
            <Link to="#">
              <img src={leftArrowIcon} alt="left arrow" />
            </Link>
          </div>
          <div className="reservation-text">
            <h1 className="mb-8">Reservation</h1>
          </div>
        </header>
      </div>

      <main>
        <div className="container">
          <div className="reservation-detail">
            <div className="row">
              <section className="wrapper-reservation-1 col-lg-8">
                <img src={fixieGray} alt="fixie-gray" />
              </section>
              <section className="wrapper-reservation-2 col-lg-4">
                <div className="div-content-1">
                  <h1>Fixie - Gray Only</h1>
                  <h2>Yogyakarta</h2>
                  <p className="noPrepayment">No prepayment</p>
                </div>
                <div className="div-content-2">
                  <div className="minus">-</div>
                  <div className="qty">2</div>
                  <div className="plus">+</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <div className="btn-group">
          <div className="button1">
            <button className="chat" type="button">
              Chat Admin
            </button>
          </div>
          <div className="button2">
            <button className="reservation" type="button">
              Reservation
            </button>
          </div>
          <div className="button3">
            <button className="like" type="button">
              <img src={heartIcon} alt="heart" className="heart-logo" />
              Like
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Reservation;
