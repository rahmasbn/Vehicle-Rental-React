import React, { Component } from "react";
// import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import VehicleCard from "../../components/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { vehicles } from "../../utils/https/vehicles";
import Loading from "../../components/Loading";
import "./vehicleType.css";

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: [],
      title: "",
      meta: "",
      isSuccess: false,
      // offset: 0,
      // perPage: 8,
      // currentPage: 0,
      // pageCount,
    };
  }

  getVehicles(filter) {
    const { match } = this.props;
    let URL = filter + "&type=" + match.params.category;
    let category = match.params.category;
    // console.log('match ',match)
    // console.log('url ',URL)

    if (category === "car") {
      this.setState({
        title: "Cars",
      });
    } else if (category === "motorbike") {
      this.setState({
        title: "Motorbikes",
      });
    } else if (category === "bike") {
      this.setState({
        title: "Bikes",
      });
    }

    vehicles(URL)
      .then((res) => {
        // const vehicleData = res.data.result.data;
        // console.log(vehicleData);

        // console.log(vehicleData.length);
        this.setState({
          vehicleData: res.data.result.data,
          meta: res.data.result.meta,
          isSuccess: true,

          //   pageCount: Math.ceil(vehicleData.length / this.state.perPage),
          // });
        });
      })
      .catch((err) => console.error(err));
  }
  updateFilter = (newFilter) => {
    console.log("update pagination", newFilter);
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
    // const page = parseInt(this.props.page)
    // console.log('filter1', filter)
    // console.log("keyword", keyword);
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

  // handlePageClick = (e) => {
  //   const selectedPage = e.selected;
  //   // console.log(selectedPage);
  //   const offset = selectedPage * this.state.perPage;

  //   this.setState(
  //     {
  //       currentPage: selectedPage,
  //       offset: offset,
  //     },
  //     () => {
  //       this.getVehicles();
  //     }
  //   );
  // };

  // componentDidMount() {
  //   this.getVehicles();
  // }

  render() {
    return (
      <>
        <Header />
        {this.state.isSuccess ? (
          <main className="Popular">
            <div className="container">
              <h2>{this.state.title}</h2>
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
        {/* <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          // breakLabel={"..."}
          pageCount={this.state.pageCount}
          // marginPagesDisplayed={2}
          // pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          // breakClassName={"page-item"}
          // breakLinkClassName={"page-link"}
          activeClassName={"active"}
        /> */}

        <Footer />
      </>
    );
  }
}

export default Vehicles;
