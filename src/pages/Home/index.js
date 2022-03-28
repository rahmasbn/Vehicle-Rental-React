import rightArrow from "../../assets/icons/cc-arrow-right-circle-32.png";
import leftArrow from "../../assets/icons/cc-arrow-left-circle-32.png";
import edwardPic from "../../assets/images/man-with-camera.webp";
import samanthaPic from "../../assets/images/girl-with-red-clothes.webp";

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Loading from "../../components/Loading";
import VehicleCard from "../../components/Card/index";
import { popularCard } from "../../utils/https/vehicles";
import "./Home.css";

class Home extends React.Component {
  state = {
    vehicleData: [],
    isOwner: false,
    isLoading: false,
  };
  componentDidMount() {
    this.getRole();
    this.setState({ isLoading: true });
    popularCard()
      .then((res) => {
        // console.log("response", res.data.result);
        this.setState({
          vehicleData: res.data.result.data,
          isLoading: false,
        });
      })
      .catch((err) => console.error(err));
  }

  getRole = () => {
    // console.log('roles', this.props.role);
    const role_id = this.props.role;
    if (role_id === 2) {
      this.setState({ isOwner: true });
    } else {
      this.setState({ isOwner: false });
    }
  };

  render() {
    const explore = (e) => {
      e.preventDefault();
      const navTo = `/vehicles?city=${e.target.city.value}&type=${e.target.type.value}&sort=${e.target.sort.value}&order=${e.target.order.value}`;
      // console.log("nav", navTo);
      this.props.history.push(navTo);
    };
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
                <form onSubmit={explore}>
                  <div className="wrapper-banner">
                    <div className="inside-wrapper-banner">
                      <select name="city" className="form-select">
                        <option value="" hidden>
                          Location
                        </option>
                        <option value="bali">Bali</option>
                        <option value="yogyakarta">Yogyakarta</option>
                        <option value="jakarta">Jakarta</option>
                        <option value="bandung">Bandung</option>
                        <option value="malang">Malang</option>
                        <option value="medan">Medan</option>
                        <option value="bogor">Bogor</option>
                      </select>
                    </div>
                    <div className="inside-wrapper-banner">
                      <select name="type" className="form-select">
                        <option value="" hidden>
                          Type
                        </option>
                        <option value="car">Car</option>
                        <option value="motorbike">Motorbike</option>
                        <option value="bike">Bike</option>
                      </select>
                    </div>
                  </div>
                  <div className="wrapper-banner">
                    <div className="inside-wrapper-banner">
                      <select name="sort" className="form-select">
                        <option value="" hidden>
                          Sort
                        </option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                      </select>
                    </div>
                    <div className="inside-wrapper-banner">
                      {/* <input type="date" className="form-select" /> */}
                      <select name="order" className="form-select">
                        <option value="" hidden>
                          Order
                        </option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                  </div>
                  <button className="explore" type="submit">
                    Explore
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Popular */}
        {!this.state.isLoading ? (
          <main className="main-content">
            <div className="container">
              <h2>Popular in Town</h2>
              <div className="view-more" style={{ textAlign: "right" }}>
                <Link to="/vehicles/popular?order=desc&page=1&limit=8">View All {">"} </Link>
              </div>
              <div className="row">
                <VehicleCard vehicleData={this.state.vehicleData} />
              </div>
            </div>
          </main>
        ) : (
          <Loading />
        )}
        {this.state.isOwner && (
          <div className="container">
            <div className="add-btn">
              <Link to="/vehicle/new">
                <button className="add-new-item-vehicle">Add new item</button>
              </Link>
            </div>
          </div>
        )}

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

const mapStateToProps = (state) => {
  return {
    role: state.auth.userData.role,
  };
};

export default connect(mapStateToProps)(Home);
