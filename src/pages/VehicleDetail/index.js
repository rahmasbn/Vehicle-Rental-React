import React from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.png";
import fixieGray from "../../assets/images/fixie-gray.webp";
import rightArrowIcon from "../../assets/icons/right-arrow.png";
import heartIcon from "../../assets/icons/yellow-heart.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import "./detail.css";

const numberFormat = (value) => {
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
}

class VehicleDetail extends React.Component {
  state = {
    counter: 1,
    detailVehicle: '',
  }

  // onClickAdd = () => {

  // }
  // componentDidMount() {
  //   const vehicleId 
  // }

  render() {
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
                  <div className="inside-wrapper-detail">
                    <img src={fixieGray} alt="fixie-gray" />
                  </div>
                  <div className="inside-wrapper-detail">
                    <div className="detail">
                      <div className="grid-item-detail">
                        <img
                          src={leftArrowIcon}
                          alt="left-arrow"
                          className="left-arrow"
                        />
                      </div>
                      <div className="grid-item-detail">
                        <img
                          src={fixieGray}
                          alt="fixie-gray"
                          className="item"
                        />
                      </div>
                      <div className="grid-item-detail">
                        <img
                          src={fixieGray}
                          alt="fixie-gray"
                          className="item"
                        />
                      </div>
                      <div className="grid-item-detail">
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
                      <h1>Fixie - Gray Only</h1>
                      <h2>Yogyakarta</h2>
                      <p className="available">Available</p>
                      <p className="noPrepayment">No prepayment</p>
                      <p className="capacity">Capacity : 1 person</p>
                      <p className="type">Type : Bike</p>
                      <p className="reservation-text">
                        Reservation before 2 PM
                      </p>
                      <h3>Rp. 78.000/day</h3>
                    </div>
                  </div>
                  <div className="div-inner">
                    <div className="content-3">
                      <div className="minus">-</div>
                      <div className="qty">2</div>
                      <div className="plus">+</div>
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
              <Link to="/reservation">
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
