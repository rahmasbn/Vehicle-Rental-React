import React from "react";
import ReactPaginate from "react-paginate";

import VehicleCard from "../../components/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import { popular } from "../../utils/https/vehicles";
import "./vehicleType.css";
import axios from "axios";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      vehicleData: [],
      perPage: 8,
      currentPage: 0,
      page: 1,
      pageCount: 0,
    };
  }
  getVehicles() {
    const popularURL = process.env.REACT_APP_HOST + "/vehicles/popular";
    const { location } = this.props;

    // popularURL()
    axios
      .get(popularURL + location.search)
      .then((res) => {
        // console.log(res)
        //
        const vehicleData = res.data.result.data;
        // console.log(vehicleData);

        // console.log(vehicleData.length);
        this.setState(
          {
            vehicleData: vehicleData.slice(
              this.state.offset,
              this.state.offset + this.state.perPage
            ),
            pageCount: Math.ceil(vehicleData.length / this.state.perPage),
          },
          // () => {
          //   this.props.history.push(
          //     `?page=${this.state.page}&limit=${this.state.perPage}`
          //   );
          // }
        );
        console.log("data", this.state.vehicleData);
        console.log("pagecount", this.state.pageCount);
      })
      .catch((err) => console.error(err));
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log("sp", selectedPage);
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
        // page: this.state.page + 1,
      },
      () => {
        this.getVehicles();
      }
    );
  };

  componentDidMount() {
    this.getVehicles();
  }
  render() {
    console.log("render()");

    return (
      <>
        <Header />
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
        </main>
        <ReactPaginate
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
        />

        <Footer />
      </>
    );
  }
}

export default Popular;
