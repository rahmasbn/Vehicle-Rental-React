import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import Lamborghini from "../../assets/images/lamborghini.jpg";
import whiteJeep from "../../assets/images/white_jeep.jpg";
// import vespa from "../../assets/images/vespa-matic.jpg";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./history.css";
import { connect } from "react-redux";
import { history } from "../../utils/https/history";
import { historyCard } from "../../components/Card";

class History extends Component {
  state = {
    show: false,
    history: [],
  };

  componentDidMount() {
    const token = this.props.auth.userData.token;
    history(token)
    .then((res)=> {
      // console.log(res.data.result.data);
      this.setState({
        history: res.data.result.data
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }
  render() {
    return (
      <>
        <Header />
        <div className="container history-wrapper">
          <div className="search-container">
            <div className="row">
              <div className="search-bar-history col-lg-8 col-md-10 col-sm-10 col-10">
                <div className="form">
                  <i className="fa fa-search" />
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="Search history"
                  />
                </div>
              </div>
              <div className="checkbox col-lg-2 col-md-2 col-sm-2 col-2">
                <label htmlFor="" className="form-check-label">
                  Select
                </label>{" "}
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                />
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle filter"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button className="dropdown-item" type="button">
                    Type
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Date Added
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Name
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Favorite Product
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <aside className="card-container">
            <p> New Arrival</p>
            <div className="card">
              <img src={Lamborghini} alt="lamborghini" />
              <figcaption>
                <strong>Lamborgini</strong>
                <br />
                South Jakarta
              </figcaption>
            </div>
            <div className="card">
              <img src={whiteJeep} alt="white jeep" />
              <figcaption>
                <strong>White Jeep</strong>
                <br />
                Kalimantan
              </figcaption>
            </div>
          </aside>

          <div className="history-container">
            <p>A week ago</p>
            {/* <div className="card-history d-flex">
              <div className="img col-lg-5 col-md-5 col-sm-12">
                <img src={vespa} alt="vespa matic" />
              </div>
              <div className="info-history-vehicle">
                <p className="vehicle-name">
                  <strong>Vespa Matic</strong>
                </p>
                <p className="rental-date">Jan 18 to 21 2021</p>
                <p className="total-price">
                  <strong>Prepayment: Rp. 245.000</strong>
                </p>
                <p className="status-history">Has been returned</p>
              </div>
            </div>
            <div className="select-box">
              <div className="checkbox">
                <input
                  className="form-check-input check"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                />
              </div>
            </div>
            <div className="card-history d-flex">
              <div className="img col-lg-5 col-md-5 col-sm-12">
                <img src={vespa} alt="vespa matic" className="img2" />
              </div>
              <div className="info-history-vehicle down">
                <p className="vehicle-name">
                  <strong>Vespa Matic</strong>
                </p>
                <p className="rental-date">Jan 18 to 21 2021</p>
                <p className="total-price">
                  <strong>Prepayment: Rp. 245.000</strong>
                </p>
                <p className="status-history">Has been returned</p>
              </div>
            </div>
            <div className="select-box two">
              <div className="checkbox">
                <input
                  className="form-check-input check"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                />
              </div>
            </div> */}

            <div className="modal-container">
              <Button
                className="btn btn-warning btn-modal"
                onClick={() => {
                  this.setState({ show: !this.state.show });
                }}
              >
                Delete selected item
              </Button>
              <Modal show={this.state.show} className="modal modal-history">
                <Modal.Body className="modal-body">
                  <h1>Are you sure do you want to delete selected item?</h1>
                  <div className="modal-btn">
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        this.setState({ show: !this.state.show });
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      className="btn btn-secondary"
                      onClick={() => {
                        this.setState({ show: !this.state.show });
                      }}
                    >
                      No
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(History);
