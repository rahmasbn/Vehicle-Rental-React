import React, { Component } from "react";
import ReactPaginate from "react-paginate";

import VehicleCard from "../../components/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { vehicles } from "../../utils/https/vehicles";
import "./vehicleType.css";

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      vehicleData: [],
      perPage: 8,
      currentPage: 0,
      title: "",
      // pageCount,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  getVehicles() {
    const { match } = this.props;
    let URL = "?type="+match.params.category;
    let category = match.params.category;
    // console.log('category ',category)
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
        const vehicleData = res.data.result.data;
        // console.log(vehicleData);

        // console.log(vehicleData.length);
        this.setState({
          vehicleData: vehicleData.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          ),
          pageCount: Math.ceil(vehicleData.length / this.state.perPage),
        });
      })
      .catch((err) => console.error(err));
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    // console.log(selectedPage);
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
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
    return (
      <>
        <Header />
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

export default Vehicles;
