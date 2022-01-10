import axios from "axios";
import React from "react";

import VehicleCard from "../../components/Card/index";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/index";

class VehicleType extends React.Component {
  state = {
    popularVehicle: [],
    carsData: [],
    motorbikesData: [],
    bikesData: [],
    // placeholder: this.props.placeholder,
  };

  componentDidMount() {
    const urlPopular = axios.get(
      "http://localhost:8000/vehicles/popular?order=desc&page=1&limit=4"
    );
    const urlCar = axios.get(
      `http://localhost:8000/vehicles?page=1&limit=4&type=car`
    );
    const urlMotorbike = axios.get(
      `http://localhost:8000/vehicles?page=1&limit=4&type=motorbike`
    );
    const urlBike = axios.get(
      `http://localhost:8000/vehicles?page=1&limit=4&type=bike`
    );

    axios
      .all([urlPopular, urlCar, urlMotorbike, urlBike])
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

  // const placeholder = props.placeholder;
  render() {
    return (
      <>
        <Header />
        <main className="vehicleType">
          <div className="container">
            <div className="search-bar mt-5">
              <SearchBar placeholder="Search vehicle (ex. cars, cars name)"/>
            </div>
            <h2>Popular in Town</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicle-type/popular">View More {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.popularVehicle} />
            </div>

            <h2>Cars</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicle-type/cars">View More {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.carsData} />
            </div>

            <h2>Motorbikes</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicle-type/motorbikes">View More {">"} </Link>
            </div>
            <div className="row">
              <VehicleCard vehicleData={this.state.motorbikesData} />
            </div>

            <h2>Bikes</h2>
            <div className="view-more" style={{ textAlign: "right" }}>
              <Link to="/vehicle-type/bikes">View More {">"} </Link>
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
