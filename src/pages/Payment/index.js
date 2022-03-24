import React from "react";
import { connect } from "react-redux";

import leftArrowIcon from "../../assets/icons/left-arrow.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { profile } from "../../utils/https/users";
import "./payment.css";
import { toast } from "react-toastify";
import { createTransaction } from "../../utils/https/history";
import Loading from "../../components/Loading";
import { logoutAction } from "../../redux/actions/auth";

class Payment extends React.Component {
  transactionData = this.props.location.state;

  state = {
    imgVehicle: require("../../assets/images/default-cars.jpeg"),
    userData: {},
    isLoading: false,
  };

  copyBookingCode = (bookingCode) => {
    navigator.clipboard.writeText(bookingCode);
    toast.success("Booking code copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  copyPaymentCode = (paymentCode) => {
    navigator.clipboard.writeText(paymentCode);
    toast.success("Payment code copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  getUserData = () => {
    const token = this.props.user.token;
    // console.log(token)
    this.setState({ isLoading: true });

    profile(token)
      .then((res) => {
        // console.log(res.data.result[0]);
        const data = res.data.result[0];
        this.setState({
          userData: data,
          isLoading: false,
        });
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

    this.getUserData();
  }

  finishPayment = () => {
    const token = this.props.user.token;
    // console.log('user', this.props.user)
    const { counter, reservationDate, totalPayment } = this.transactionData;
    const moment = require("moment");
    let date = moment(reservationDate).format("YYYY-MM-DD");

    let someDate = new Date(date);
    someDate.setDate(
      someDate.getDate() + parseInt(this.transactionData.rentalDuration)
    );
    let formatDate = someDate.toISOString().slice(0, 10);

    const body = {
      user_id: this.props.user.id,
      vehicle_id: this.transactionData.transactionData.id,
      quantity: counter,
      total_payment: totalPayment,
      start_date: date,
      return_date: formatDate,
    };
    // console.log('body', body)
    createTransaction(token, body)
      .then((res) => {
        toast.success("Payment success", {
          position: "top-right",
          autoClose: 5000,
        });
        this.props.history.push("/history");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.err_code) {
          if (
            err.response.data.err_code === "TOKEN_EXPIRED" ||
            err.response.data.err_code === "INVALID_TOKEN"
          ) {
            this.props.dispatch(logoutAction());
            toast.warning("Token Expired");
          }
        }
      });
  };

  render() {
    const moment = require("moment");
    // console.log('transaction', this.transactionData)
    const { name, city, type } = this.transactionData.transactionData;
    const { counter, reservationDate, totalPayment } = this.transactionData;
    let date = moment(reservationDate).format("YYYY-MM-DD");

    let someDate = new Date(date);
    someDate.setDate(
      someDate.getDate() + parseInt(this.transactionData.rentalDuration)
    );
    let formatDate = someDate.toISOString().slice(0, 10);

    const formatPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(totalPayment)
      .replace(/(\.|,)00$/g, "");

    const bookingCode = "#FG12009878YZS";
    const paymentCode = "#FG22009879YZS";
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
        {this.state.isLoading ? (
          <>
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
                  <div className="payment-deadline">
                    <p className="deadline">
                      Pay before:<p style={{ color: "green" }}>59:30</p>
                    </p>
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
                      <p>{paymentCode}</p>
                    </div>
                    <div className="copy-code">
                      <button
                        onClick={() => {
                          this.copyPaymentCode(paymentCode);
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                <div className="code-wrapper col-lg-5 col-md-6 ms-auto">
                  <div className="code-title booking">
                    <p>Booking Code :</p>
                  </div>
                  <div className="booking-code d-flex">
                    <div className="code">
                      <p>{bookingCode}</p>
                    </div>
                    <div className="copy-booking-code">
                      <button
                        onClick={() => {
                          this.copyBookingCode(bookingCode);
                        }}
                      >
                        Copy
                      </button>
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
                    <p>
                      Quantity : {counter} {type}
                    </p>
                  </div>
                </div>
                <div className="detail-wrapper col-lg-7 col-md-7">
                  <div className="reservation-date">
                    <p>
                      Reservation Date :{" "}
                      <span className="date-reservation">
                        {date} - {formatDate}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="payment-wrapper col-lg-5 col-md-5">
                  <div className="price-detail">
                    <h4>Price details :</h4>
                    <p>
                      {counter} {type}: {formatPrice}
                    </p>
                    <p>Total : {formatPrice}</p>
                  </div>
                </div>
                <div className="payment-wrapper col-lg-7 col-md-7">
                  <div className="identity-buyer">
                    <h4>Identity :</h4>
                    <p>
                      {this.state.userData.name} (
                      {this.state.userData.phone_number !== null
                        ? this.state.userData.phone_number
                        : ""}
                      )
                    </p>
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
                {/* <Link to="/history"> */}
                <button onClick={this.finishPayment}>Finish Payment</button>
                {/* </Link> */}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.userData,
  };
};
export default connect(mapStateToProps)(Payment);
