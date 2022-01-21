import axios from "axios";
import React from "react";

import VehicleCard from "../../components/Card/index";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { Link } from "react-router-dom";
// import SearchBar from "../../components/SearchBar/index";
import { vehicleType } from "../../utils/https/vehicles";
import SearchIcon from "@material-ui/icons/Search";

class VehicleType extends React.Component {
  state = {
    popularVehicle: [],
    carsData: [],
    motorbikesData: [],
    bikesData: [],
  };

  componentDidMount() {
    vehicleType()
      .then(
        axios.spread((...res) => {
          //   console.log(res[0].data.result.data);
          this.setState({
            popularVehicle: res[0].data.result.data,
            carsData: res[1].data.result.data,
            motorbikesData: res[2].data.result.data,
            bikesData: res[3].data.result.data,
          });
        })
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        <Header />
        <main className="vehicleType">
          <div className="container">
            <div className="search-bar mt-5">
              <div className="searchInput d-flex">
                <input
                  type="text"
                  placeholder="Search vehicle (ex. cars, cars name)"
                />
              </div>
              <div className="searchIcon">
                <SearchIcon />
              </div>
            </div>
            <h2>Popular in Town</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicles/popular">View All {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.popularVehicle} />
            </div>

            <h2>Cars</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicles/car">View All {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.carsData} />
            </div>

            <h2>Motorbikes</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicles/motorbike">View All {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.motorbikesData} />
            </div>

            <h2>Bikes</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicles/bike">View All {">"} </Link>
            </div>
            <div className="row mb-5">
              <VehicleCard vehicleData={this.state.bikesData} />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default VehicleType;
