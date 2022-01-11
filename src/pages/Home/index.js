import rightArrow from "../../assets/images/cc-arrow-right-circle-32.png";
import leftArrow from "../../assets/images/cc-arrow-left-circle-32.png";
import edwardPic from "../../assets/images/man-with-camera.webp";
import samanthaPic from "../../assets/images/girl-with-red-clothes.webp";

import { Link } from "react-router-dom";
import React from "react";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import VehicleCard from "../../components/Card/index";
import { popularCard } from "../../utils/https/vehicles";
import "./Home.css";

class Home extends React.Component {
  state = {
    vehicleData: [],
  }
  componentDidMount() {
        popularCard()
          .then((res) => {
            // console.log("response", res.data.result);
            this.setState({
              vehicleData: res.data.result.data,
            });
          })
          .catch((err) => console.error(err));
      }
  render() {
    return (
      <>
        <Header />

        {/* Banner */}
        <div className="container-fluid banner">
          <div className="container">
            <div className="grid-container-banner">
              <div className="grid-item-banner">
                <h1>
                  Explore and <br />
                  Travel
                </h1>
              </div>
              <div className="grid-item-banner">
                <p>Vehicle Finder</p>
                <hr />
              </div>
              <div className="grid-item-banner">
                <form>
                  <div className="wrapper-banner">
                    <div className="inside-wrapper-banner">
                      <select id="location" className="form-select">
                        <option value="">Location</option>
                        <option value="Bali">Bali</option>
                        <option value="Yogyakarta">Yogyakarta</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Kalimantan">Kalimantan</option>
                        <option value="Malang">Malang</option>
                      </select>
                    </div>
                    <div className="inside-wrapper-banner">
                      <select id="type" className="form-select">
                        <option value="">Type</option>
                        <option value="Cars">Cars</option>
                        <option value="Motorbikes">Motorbikes</option>
                        <option value="Bikes">Bikes</option>
                      </select>
                    </div>
                  </div>
                  <div className="wrapper-banner">
                    <div className="inside-wrapper-banner">
                      <select id="payment" className="form-select">
                        <option value="Payment">Payment</option>
                        {/* <option value="Cash">Cash</option>
                        <option value="DP">DP</option> */}
                      </select>
                    </div>
                    <div className="inside-wrapper-banner">
                      <input type="date" className="form-select" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <button className="explore" type="button">
              Explore
            </button>
          </div>
        </div>

        {/* Popular */}
        <main className="main-content">
          <div className="container">
            <h2>Popular in Town</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicle-type/popular">View More {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.vehicleData}/>
            </div>
          </div>
        </main>

        {/* Testimoni */}
        <section className="testimonial-section d-flex align-items-center">
          <div className="container">
            <h2 className="mb-5 testimoni">Testimonials</h2>
            <div className="testimoni-wrapper">
              <div className="testimoni-content">
                <div
                  id="myCarousel"
                  className="carousel slide"
                  data-bs-interval="5000"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className="carousel-item testi-item active"
                      data-img={edwardPic}
                    >
                      <div className="star-wrapper">
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                      </div>
                      <p className="mt-3 review">
                        "It was the right decision to rent vehicle here, I spent
                        less money and enjoy the trip. It was an amazing
                        experience to have a ride for wildlife trip!"
                      </p>
                      <h4 style={{ marginTop: "50px" }}>Edward Newgate</h4>
                      <p
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "14px",
                        }}
                        className="founder"
                      >
                        Founder Circle
                      </p>
                    </div>
                    <div
                      className="carousel-item testi-item"
                      data-img={samanthaPic}
                    >
                      <div className="star-wrapper">
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                        <div className="rating">
                          <span className="fa fa-star checked"></span>
                        </div>
                      </div>
                      <p className="mt-3 review">
                        "It was the right decision to rent vehicle here, I spent
                        less money and enjoy the trip. It was an amazing
                        experience to have a ride for wildlife trip!"
                      </p>
                      <h4 style={{ marginTop: "50px" }}>Samantha Doe</h4>
                      <p
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "14px",
                        }}
                        className="founder"
                      >
                        Founder Circle
                      </p>
                    </div>
                  </div>
                  <div className="btn-prev-next">
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#myCarousel"
                      data-bs-slide="prev"
                      onClick={window["carousel"]}
                    >
                      <img src={leftArrow} alt="prev" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#myCarousel"
                      data-bs-slide="next"
                      onClick={window["carousel"]}
                    >
                      <img src={rightArrow} alt="next" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="testimoni-content picture">
                <div className="testi-img">
                  <div className="img-box">
                    <div className="img-box-inner">
                      <img
                        src={edwardPic}
                        className="img-testi"
                        alt="img-testi"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Home;