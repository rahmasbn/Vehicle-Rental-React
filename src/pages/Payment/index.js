import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./payment.css";

function Payment() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <header className="payment-header">
          <div className="img-arrow">
            <Link to="/reservation">
              <img src={leftArrowIcon} alt="left arrow" />
            </Link>
          </div>
          <div className="payment-text">
            <h1 className="mb-8">Payment</h1>
          </div>
        </header>
      </div>

      <div className="container-fluid">
        <div className="payment-banner">
          <div className="container">
            <div className="vehicle-title">
              <h1>Fixie - Gray Only</h1>
              <h2>Yogyakarta</h2>
              <p>No Prepayment</p>
            </div>
            <div className="btn-payment-deadline">
              <button className="btn-deadline">
                Pay before:<span style={{ color: "green" }}>59:30</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="code-wrapper col-lg-5 col-md-6">
            <div className="code-title">
              <p>Payment Code :</p>
            </div>
            <div className="payment-code d-flex">
              <div className="code">
                <p>#FG12009878YZS</p>
              </div>
              <div className="copy-code">
                <button>Copy</button>
              </div>
            </div>
          </div>
          <div className="code-wrapper col-lg-5 col-md-6">
            <div className="code-title booking">
              <p>Booking Code :</p>
            </div>
            <div className="booking-code d-flex">
              <div className="code">
                <p>#FG12009878YZS</p>
              </div>
              <div className="copy-booking-code">
                <button>Copy</button>
              </div>
            </div>
          </div>
        </div>
        <h3>DETAIL ORDER</h3>
        <div className="row">
          <div className="detail-wrapper col-lg-5 col-md-5">
            <div className="quantity">
              <p>Quantity : 2 bikes</p>
            </div>
          </div>
          <div className="detail-wrapper col-lg-7 col-md-7">
            <div className="reservation-date">
              <p>
                Reservation Date : <span>Jan 18-20 2021</span>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="payment-wrapper col-lg-5 col-md-5">
            <div className="price-detail">
              <h4>Price details :</h4>
              <p>1 bike: Rp. 78.000</p>
              <p>1 bike: Rp. 78.000</p>
            </div>
          </div>
          <div className="payment-wrapper col-lg-7 col-md-7">
            <div className="identity-buyer">
              <h4>Identity :</h4>
              <p>Samantha Doe (+6290987682)</p>
              <p>samanthadoe@mail.com</p>
            </div>
          </div>
        </div>
        <h3>PAYMENT METHODS</h3>
        <div className="row">
          <div className="button-payment col-lg-6 col-md-6">
            <div className="btn-transfer ">
              <button>TRANSFER</button>
            </div>
          </div>
          <div className="button-payment col-lg-6 col-md-6">
            <div className="btn-cash ">
              <button>CASH</button>
            </div>
          </div>
        </div>
        <div className="btn-finish-payment col-lg-12">
          <button>Finish Payment</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
