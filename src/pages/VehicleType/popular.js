import React from "react";
import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";

import VehicleCard from "../../components/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import { popular } from "../../utils/https/vehicles";
import "./vehicleType.css";
import { vehicles } from "../../utils/https/vehicles";
import Loading from "../../components/Loading";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: [],
      meta: "",
      isSuccess: false,
    };
  }
  getVehicles(filter) {
    const URL = `/popular${filter}`;
    vehicles(URL)
      .then((res) => {
        // console.log(res)
        this.setState({
          vehicleData: res.data.result.data,
          meta: res.data.result.meta,
          isSuccess: true,
        });
       
        // console.log("data", this.state.vehicleData);
        // console.log("meta", this.state.meta);
      })
      .catch((err) => console.error(err));
  }

  updateFilter = (newFilter) => {
    // console.log("update pagination", newFilter);
    this.getVehicles(newFilter);
  };

  pagination = (meta) => {
    if (meta !== null) {
      const { page, next, prev } = meta;

      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {prev !== null ? (
              <li className="page-item">
                <Link
                  to={`${prev}`}
                  className="page-link"
                  onClick={() => {
                    this.updateFilter(prev);
                    // this.updateFilter(page);
                  }}
                >
                  Prev
                </Link>
              </li>
            ) : (
              <li className="page-item disabled">
                <button className="page-link" aria-disabled="true">
                  Prev
                </button>
              </li>
            )}
            <li className="page-item">
              <button className="page-link">{page}</button>
            </li>
            {next !== null ? (
              <li className="page-item">
                <Link
                  to={`${next}`}
                  className="page-link"
                  onClick={() => {
                    this.updateFilter(next);
                    // this.updateFilter(page);
                  }}
                >
                  Next
                </Link>
              </li>
            ) : (
              <li className="page-item disabled">
                <button className="page-link" aria-disabled="true">
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      );
    }
  };

  componentDidMount() {
    const filter = this.props.location.search;
    this.getVehicles(filter);
  }

  componentDidUpdate(a, b) {
    // console.log('a dan b', a, b)
    const filter = this.props.location.search;
    if (a.location.search !== filter) {
      this.getVehicles(filter);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  render() {
    // console.log('location', this.props.location.search)
    return (
      <>
        <Header />
        {this.state.isSuccess ? (
          <main className="Popular">
            <div className="container">
              <h2>Popular in Town</h2>
              <div className="col-12 text-center click-item">
                Click item to see details and reservation.
              </div>
              <div className="row">
                <VehicleCard vehicleData={this.state.vehicleData} />
              </div>
            </div>
            <div className="mt-5">{this.pagination(this.state.meta)}</div>
          </main>
        ) : (
          <Loading />
        )}
        <Footer />
      </>
    );
  }
}

export default Popular;
