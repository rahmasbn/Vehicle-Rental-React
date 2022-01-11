import React, { useRef } from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/images/left-arrow.png";
import fixieGray from "../../assets/images/fixie-gray.webp";
import heartIcon from "../../assets/images/yellow-heart.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
// import Counter from "../../components/Counter";
import "./reservation.css";

function Reservation() {
  const ref = useRef();
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
              <section className="wrapper-reservation-1 col-lg-7">
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
                <div className="div-content-3">
                  <p>Reservation Date :</p>
                  <div class="select date">
                    <input
                      type="text"
                      className="form-control date mt-3 py-2"
                      ref={ref}
                      placeholder="Select date"
                      // onChange={(e) => console.log(e.target.value)}
                      onFocus={() => (ref.current.type = "date")}
                      onBlur={() => (ref.current.type = "text")}
                    />
                  </div>
                  <select id="days" className="form-select  mt-3 py-2">
                    <option value="">1 Day</option>
                    <option value="Bali">2 Days</option>
                  </select>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <div className="button1 mb-5 mt-n5">
          <button className="reservation mx-5" type="button">
            Pay now : Rp.178.000
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Reservation;
