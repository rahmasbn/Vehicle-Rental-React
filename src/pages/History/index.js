import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import Lamborghini from "../../assets/images/lamborghini.jpg";
import whiteJeep from "../../assets/images/white_jeep.jpg";
// import vespa from "../../assets/images/vespa-matic.jpg";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import "./history.css";
import { history } from "../../utils/https/history";
import { HistoryCard } from "../../components/Card";
import { logoutAction } from "../../redux/actions/auth";

class History extends Component {
  state = {
    show: false,
    history: [],
    isLoading: false,
    isDelete: false,
  };

  componentDidMount() {
    const token = this.props.auth.userData.token;
    this.setState({
      isLoading: true,
    });
    history(token)
      .then((res) => {
        console.log(res.data.result.data);
        this.setState({
          history: res.data.result.data,
          isLoading: false,
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
    console.log("props", this.props.check);
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
                {/* <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                /> */}
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
            {!this.state.isLoading ? (
              <>
                <p>A week ago</p>
                <HistoryCard history={this.state.history} />

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
                    <Modal.Body>
                      <h1>Are you sure you want to delete selected item?</h1>
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
              </>
            ) : (
              <Loading />
            )}
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
  };
};

export default connect(mapStateToProps)(History);
