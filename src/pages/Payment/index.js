import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import leftArrowIcon from "../../assets/icons/left-arrow.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { profile } from "../../utils/https/users";
import "./payment.css";

class Payment extends React.Component {
  transactionData = this.props.location.state;

  state = {
    imgVehicle: require("../../assets/images/default-cars.jpeg"),
    userData: {},
  };

  getUserData = () => {
    const token = this.props.token;
    // console.log(token)

    profile(token)
      .then((res) => {
        // console.log(res.data.result[0]);
        const data = res.data.result[0];
        this.setState({
          userData: data
        })
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    const image = JSON.parse(this.transactionData.transactionData.images)[0];
    // console.log('payment', image);
    if (image !== null && typeof image !== "undefined") {
      this.setState({
        imgVehicle: process.env.REACT_APP_HOST + "/" + image,
      });
    }
    
    this.getUserData()
  }

  render() {
    const moment = require("moment");
    console.log('transaction', this.transactionData)
    const { name, city, type } = this.transactionData.transactionData;
    const { counter, reservationDate, totalPayment } = this.transactionData;
    let date = moment(reservationDate).format("YYYY-MM-DD");
    const formatPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(totalPayment);
    return (
      <>
        <Header />
        <div className="container py-5">
          <header className="payment-header">
            <div className="img-arrow">
              <img
                src={leftArrowIcon}
                alt="left arrow"
                onClick={() => this.props.history.goBack()}
              />
            </div>
            <div className="payment-text">
              <h1 className="mb-8">Payment</h1>
            </div>
          </header>
        </div>

        <div className="container-fluid">
          <div
            className="payment-banner"
            style={{ backgroundImage: `url(${this.state.imgVehicle})` }}
          >
            <div className="container">
              <div className="vehicle-title">
                <h1>{name}</h1>
                <h2>{city}</h2>
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
          <div className="title-payment">
            <h3>DETAIL ORDER</h3>
          </div>
          <div className="row">
            <div className="detail-wrapper col-lg-5 col-md-5">
              <div className="quantity">
                <p>Quantity : {counter} {type}</p>
              </div>
            </div>
            <div className="detail-wrapper col-lg-7 col-md-7">
              <div className="reservation-date">
                <p>
                  Reservation Date : <span>{date}</span>
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
                <p>Total : {formatPrice}</p>
              </div>
            </div>
            <div className="payment-wrapper col-lg-7 col-md-7">
              <div className="identity-buyer">
                <h4>Identity :</h4>
                <p>{this.state.userData.name} ({this.state.userData.phone_number})</p>
                <p>{this.state.userData.email}</p>
              </div>
            </div>
          </div>
          <div className="title-payment">
            <h3>PAYMENT METHODS</h3>
          </div>
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
            <Link to="/history">
            <button>Finish Payment</button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token
  }
}
export default connect(mapStateToProps)(Payment);
