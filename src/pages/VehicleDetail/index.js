import React from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.png";
import rightArrowIcon from "../../assets/icons/right-arrow.png";
import heartIcon from "../../assets/icons/yellow-heart.png";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import "./detail.css";
// import axios from "axios";
import { getDetailVehicle } from "../../utils/https/vehicles";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import { logoutAction } from "../../redux/actions/auth";
import { toast } from "react-toastify";

const formatPrice = (value) => {
  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(value)
    .replace(/(\.|,)00$/g, "");
  return price;
};

class VehicleDetail extends React.Component {
  state = {
    counter: 1,
    detailVehicle: "",
    imgVehicle1: require("../../assets/images/default-cars.jpeg"),
    imgVehicle2: require("../../assets/images/default-cars.jpeg"),
    imgVehicle3: require("../../assets/images/default-cars.jpeg"),
    isLoading: false,
  };

  addCounter = () => {
    const newCounter = this.state.counter;
    const stock = this.state.detailVehicle.stock;
    this.setState({
      counter: newCounter + 1 > stock ? stock : newCounter + 1,
    });
  };

  subCounter = () => {
    const newCounter = this.state.counter;
    this.setState({
      counter: newCounter - 1 < 1 ? 1 : newCounter - 1,
    });
  };

  componentDidMount() {
    const { match } = this.props;
    const vehicleId = match.params.id;

    this.setState({ isLoading: true });
    getDetailVehicle(vehicleId)
      .then((res) => {
        this.setState({ isLoading: false });
        // console.log(res.data);
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
          // price: res.data.result[0].price,
        });
      })
      .catch((err) => {
        console.error(err);
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
  }

  render() {
    const { name, type, city, capacity, status, user_id, price } =
      this.state.detailVehicle;
    const { imgVehicle1, imgVehicle2, imgVehicle3 } = this.state;
    const { match } = this.props;
    const vehicleId = match.params.id;

    return (
      <div>
        <Header />

        <div className="container py-5">
          <header className="header-title">
            <div className="img-arrow">
              <img
                src={leftArrowIcon}
                alt="left arrow"
                onClick={() => this.props.history.goBack()}
              />
            </div>
            <div className="detail-title">
              <h1 className="mb-8">Detail</h1>
            </div>
          </header>
        </div>

        {!this.state.isLoading ? (
          <>
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
                          <p className="capacity">
                            Capacity : {capacity} person
                          </p>
                          <p className="type">Type : {type}</p>
                          <p className="reservation-text">
                            Reservation before 2 PM
                          </p>
                          <h3>{formatPrice(price)}/day</h3>
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
              {user_id === this.props.user.id && this.props.user.role === 2 && (
                <div className="btnEdit mb-5 mt-5">
                  <Link to={`/vehicle/edit/${vehicleId}`}>
                    <button className="editBtn" type="button">
                      Edit item
                    </button>
                  </Link>
                </div>
              )}
              {this.props.user.role !== 2 && (
                <>
                  <div className="btn-group">
                    <div className="button1">
                      <button className="chat" type="button">
                        Chat Admin
                      </button>
                    </div>
                    <div className="button2">
                      <Link
                        to={{
                          pathname: "/reservation",
                          state: {
                            detailVehicle: this.state.detailVehicle,
                            counter: this.state.counter,
                          },
                        }}
                      >
                        <button className="reservation" type="button">
                          Reservation
                        </button>
                      </Link>
                      {/* )} */}
                    </div>
                    <div className="button3">
                      <button className="like" type="button">
                        <img
                          src={heartIcon}
                          alt="heart"
                          className="heart-logo"
                        />
                        Like
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.userData,
  };
};

export default connect(mapStateToProps)(VehicleDetail);
