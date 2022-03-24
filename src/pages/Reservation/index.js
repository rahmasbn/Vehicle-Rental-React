import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
// import fixieGray from "../../assets/images/fixie-gray.webp";
import defaultImg from "../../assets/images/default_vehicle.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import "./reservation.css";
import Loading from "../../components/Loading";

const formatPrice = (value) => {
  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(value)
    .replace(/(\.|,)00$/g, "");
  return price;
};

const getToday = () => {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  const today = year + "-" + month + "-" + day;
  return today;
};

class Reservation extends React.Component {
  detailVehicle = this.props.location.state;

  state = {
    imgVehicle: require("../../assets/images/default-cars.jpeg"),
    counter: this.detailVehicle.counter,
    totalPayment: null,
    rentalDuration: 1,
    reservationDate: null,
    transactionData: null,
    isLoading: false,
  };

  addCounter = () => {
    const stock = this.detailVehicle.detailVehicle.stock;
    const newCounter = this.state.counter;
    const duration = this.state.rentalDuration;
    const price = this.state.transactionData.price;

    this.setState({
      counter: newCounter + 1 > stock ? stock : newCounter + 1,
      totalPayment: (newCounter + 1) * price * duration,
    });
  };

  subCounter = () => {
    const newCounter = this.state.counter;
    const duration = this.state.rentalDuration;
    const price = this.state.transactionData.price;

    this.setState({
      counter: newCounter - 1 < 1 ? 1 : newCounter - 1,
      totalPayment: (newCounter - 1 < 1 ? 1 : newCounter - 1) * price * duration,
    });
  };

  durationChange = (e) => {
    const newCounter = this.state.counter;
    const price = this.state.transactionData.price;
    const duration = e.target.value;
    this.setState({
      rentalDuration: duration,
      totalPayment: newCounter * price * duration,
    });
  };

  handleChange = (e) => {
    const date = e.target.value;
    this.setState({
      reservationDate: date,
    });
  };

  componentDidMount() {
    const data = this.detailVehicle.detailVehicle;
    const counter = this.detailVehicle.counter;
    const today = getToday();
    // console.log("today", today);
    const totalPayment = counter * data.price;

    this.setState({
      totalPayment: totalPayment,
      transactionData: data,
      counter,
      reservationDate: today,
      isLoading: true,
    });
    const image = JSON.parse(this.detailVehicle.detailVehicle.images)[0];
    // console.log('reservation', image);
    if (image !== null && typeof image !== "undefined") {
      this.setState({
        imgVehicle: process.env.REACT_APP_HOST + "/" + image,
      });
    }
  }

  render() {
    const ref = React.createRef();
    const today = getToday();
    // console.log('total', this.state.totalPayment)

    return (
      <>
        <Header />
        <div className="container py-5">
          <header className="reservation-title">
            <div className="img-arrow">
              <img
                src={leftArrowIcon}
                alt="left arrow"
                onClick={() => this.props.history.goBack()}
              />
            </div>
            <div className="reservation-text">
              <h1 className="mb-8">Reservation</h1>
            </div>
          </header>
        </div>
        {this.state.isLoading ? (
          <>
            <main>
              <div className="container">
                <div className="reservation-detail">
                  <div className="row">
                    <section className="wrapper-reservation-1 col-lg-7 col-md-7">
                      <div className="img-vehicle-reservation">
                        <img
                          src={this.state.imgVehicle}
                          alt="img-vehicle"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = defaultImg;
                          }}
                        />
                      </div>
                    </section>
                    <section className="wrapper-reservation-2 col-lg-4 col-md-5">
                      <div className="div-content-1">
                        <h1>{this.state.transactionData.name}</h1>
                        <h2>{this.state.transactionData.city}</h2>
                        <p className="noPrepayment">No prepayment</p>
                      </div>
                      <div className="div-content-2">
                        <div className="minus" onClick={this.subCounter}>
                          -
                        </div>
                        <div className="qty">{this.state.counter}</div>
                        <div className="plus" onClick={this.addCounter}>
                          +
                        </div>
                      </div>
                      <div className="div-content-3">
                        <p>Reservation Date :</p>
                        <div className="select-date">
                          <input
                            type="text"
                            name="date"
                            className="form-control date"
                            ref={ref}
                            placeholder="Select date"
                            onChange={this.handleChange}
                            onFocus={() => (ref.current.type = "date")}
                            onBlur={() => (ref.current.type = "text")}
                            min={today}
                          />
                        </div>
                        <select
                          id="duration"
                          name="duration"
                          className="form-select  mt-3 py-2"
                          onChange={this.durationChange}
                        >
                          <option value="1">1 Day</option>
                          <option value="2">2 Days</option>
                          <option value="3">3 Days</option>
                          <option value="4">4 Days</option>
                          <option value="5">5 Days</option>
                          <option value="6">6 Days</option>
                          <option value="7">7 Days</option>
                        </select>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </main>

            <div className="container">
              <div className="pay mb-5">
                <Link
                  to={{
                    pathname: "/payment",
                    state: {
                      transactionData: this.state.transactionData,
                      counter: this.state.counter,
                      totalPayment: this.state.totalPayment,
                      rentalDuration: this.state.rentalDuration,
                      reservationDate: this.state.reservationDate,
                    },
                  }}
                >
                  <button className="btn-reservation" type="button">
                    Pay now : {formatPrice(this.state.totalPayment)}
                  </button>
                </Link>
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

export default Reservation;
