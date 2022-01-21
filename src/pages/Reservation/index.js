import React from "react";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
// import fixieGray from "../../assets/images/fixie-gray.webp";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import "./reservation.css";

class Reservation extends React.Component {
  detailVehicle = this.props.location.state;

  state = {
    counter: this.detailVehicle.counter,
    imgVehicle: require("../../assets/images/default-cars.jpeg"),
    price: this.detailVehicle.price
  };

  componentDidMount() {
    const image = JSON.parse(this.detailVehicle.detailVehicle.images)[0];
    // console.log('reservation', image);
    if (image !== null && typeof image !== "undefined") {
      this.setState({
        imgVehicle: process.env.REACT_APP_HOST + "/" + image,
      });
    }
  }

  addCounter = () => {
    const newCounter = this.state.counter;
    const stock = this.detailVehicle.detailVehicle.stock;
    // const newPrice = this.state.price;
    // console.log('stock ', stock)
    this.setState({
      counter: newCounter + 1 > stock ? stock : newCounter + 1,
      // price: newPrice * (newCounter + 1 > stock ? stock : newCounter + 1),
    });
    // console.log(this.state.price)
  };

  subCounter = () => {
    const newCounter = this.state.counter;
    // const newPrice = this.state.price;
    this.setState({
      counter: newCounter - 1 < 1 ? 1 : newCounter - 1,
      // price: newPrice * (newCounter - 1 < 1 ? 1 : newCounter - 1),
    });
  };

  render() {
    const ref = React.createRef();
    const { name, city } = this.detailVehicle.detailVehicle;
    const formatPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(this.state.price);

    console.log('detail', this.detailVehicle)

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
                <section className="wrapper-reservation-1 col-lg-7 col-md-7">
                  <div className="img-vehicle-reservation">
                    <img src={this.state.imgVehicle} alt="img-vehicle" />
                  </div>
                </section>
                <section className="wrapper-reservation-2 col-lg-4 col-md-5">
                  <div className="div-content-1">
                    <h1>{name}</h1>
                    <h2>{city}</h2>
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
                        className="form-control date"
                        ref={ref}
                        placeholder="Select date"
                        // onChange={(e) => console.log(e.target.value)}
                        onFocus={() => (ref.current.type = "date")}
                        onBlur={() => (ref.current.type = "text")}
                      />
                    </div>
                    <select id="days" className="form-select  mt-3 py-2">
                      <option value="">1 Day</option>
                      <option value="">2 Days</option>
                      <option value="">3 Days</option>
                      <option value="">4 Days</option>
                      <option value="">5 Days</option>
                      <option value="">6 Days</option>
                      <option value="">7 Days</option>
                    </select>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <div className="container">
          <div className="pay mb-5">
            <Link to="/payment">
              <button className="btn-reservation" type="button">
                Pay now : {formatPrice}
              </button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Reservation;
