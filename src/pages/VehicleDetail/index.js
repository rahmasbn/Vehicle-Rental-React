import React from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.png";
import rightArrowIcon from "../../assets/icons/right-arrow.png";
import heartIcon from "../../assets/icons/yellow-heart.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import "./detail.css";
import axios from "axios";

// const numberFormat = (value) => {
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//   }).format(value);
// };

class VehicleDetail extends React.Component {
  state = {
    counter: 1,
    detailVehicle: "",
    imgVehicle1: require("../../assets/images/default-cars.jpeg"),
    imgVehicle2: require("../../assets/images/default-cars.jpeg"),
    imgVehicle3: require("../../assets/images/default-cars.jpeg"),
    price: 0,
  };

  addCounter = () => {
    const newCounter = this.state.counter;
    const stock = this.state.detailVehicle.stock;
    const newPrice = this.state.detailVehicle.price;
    // console.log('stock ', stock)
    this.setState({
      counter: newCounter + 1 > stock ? stock : newCounter + 1,
      price: newPrice * (newCounter + 1 > stock ? stock : newCounter + 1),
    });
  };

  subCounter = () => {
    const newCounter = this.state.counter;
    const newPrice = this.state.detailVehicle.price;
    this.setState({
      counter: newCounter - 1 < 1 ? 1 : newCounter - 1,
      price: newPrice * (newCounter - 1 < 1 ? 1 : newCounter - 1),
    });
  };

  componentDidMount() {
    const { match } = this.props;
    const URL = process.env.REACT_APP_HOST + `/vehicles/` + match.params.id;
    axios
      .get(URL)
      .then((res) => {
        // console.log(JSON.parse(res.data.result[0].images)[1]);
        const image = JSON.parse(res.data.result[0].images);
        // console.log('image', image[0])
        if (image[0] !== null && typeof image[0] !== "undefined") {
          this.setState({
            imgVehicle1: process.env.REACT_APP_HOST + "/" + image[0],
          });
        }
        if (image[1] !== null && typeof image[1] !== "undefined") {
          this.setState({
            imgVehicle2: process.env.REACT_APP_HOST + "/" + image[1],
          });
        }
        if (image[2] !== null && typeof image[2] !== "undefined") {
          this.setState({
            imgVehicle3: process.env.REACT_APP_HOST + "/" + image[2],
          });
        }
        this.setState({
          detailVehicle: res.data.result[0],
          price: res.data.result[0].price,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { name, type, city, capacity, status } = this.state.detailVehicle;
    const { imgVehicle1, imgVehicle2, imgVehicle3 } = this.state;
    const formatPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(this.state.price);
    // console.log(formatPrice)
    // console.log(this.state.price)
    return (
      <div>
        <Header />

        <div className="container py-5">
          <header className="header-title">
            <div className="img-arrow">
              <Link to="#">
                <img src={leftArrowIcon} alt="left arrow" />
              </Link>
            </div>
            <div className="detail-title">
              <h1 className="mb-8">Detail</h1>
            </div>
          </header>
        </div>

        <main className="main-content">
          <div className="container">
            <div className="vehicle-detail">
              <section className="content-1">
                <div className="wrapper-detail">
                  <div className="inside-wrapper-main">
                    {/* <div className="main-img"> */}
                    <img src={imgVehicle1} alt="vehicles-img" />
                    {/* </div> */}
                  </div>
                  <div className="inside-wrapper-detail">
                    <div className="detail">
                      <div className="grid-item-arrow">
                        <img
                          src={leftArrowIcon}
                          alt="left-arrow"
                          className="left-arrow"
                        />
                      </div>
                      <div className="grid-item-detail-1">
                        <div className="item">
                          <img src={imgVehicle2} alt="vehicles-img" />
                        </div>
                      </div>
                      <div className="grid-item-detail-2">
                        <div className="item">
                          <img src={imgVehicle3} alt="vehicles-img" />
                        </div>
                      </div>
                      <div className="grid-item-arrow">
                        <img
                          src={rightArrowIcon}
                          alt="left-arrow"
                          className="right-arrow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="content-2">
                <div className="div-outer">
                  <div className="div-inner">
                    <div className="div-content">
                      <h1>{name}</h1>
                      <h2>{city}</h2>
                      <p className="available">{status}</p>
                      <p className="noPrepayment">No prepayment</p>
                      <p className="capacity">Capacity : {capacity} person</p>
                      <p className="type">Type : {type}</p>
                      <p className="reservation-text">
                        Reservation before 2 PM
                      </p>
                      <h3>{formatPrice}/day</h3>
                    </div>
                  </div>
                  <div className="div-inner">
                    <div className="content-3">
                      <div className="minus" onClick={this.subCounter}>
                        -
                      </div>
                      <div className="qty">{this.state.counter}</div>
                      <div className="plus" onClick={this.addCounter}>
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
              {/* <Link to="/reservation"> */}
              <Link
                to={{
                  pathname: "/reservation",
                  state: {
                    detailVehicle: this.state.detailVehicle,
                    counter: this.state.counter,
                    price: this.state.price,
                  },
                }}
              >
                <button className="reservation" type="button">
                  Reservation
                </button>
              </Link>
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
}

export default VehicleDetail;
