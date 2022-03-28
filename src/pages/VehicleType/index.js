import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import VehicleCard from "../../components/Card/index";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Loading from "../../components/Loading";
import { vehicleType } from "../../utils/https/vehicles";
import SearchIcon from "@material-ui/icons/Search";
import SearchVehicles from "../../components/SearchVehicles";

class VehicleType extends React.Component {
  state = {
    popularVehicle: [],
    carsData: [],
    motorbikesData: [],
    bikesData: [],
    isLoading: false,
    isSearching: false,
    keyword: null,
    page: null,
    filter: "",
    params: "",
  };

  getData = () => {
    this.setState({ isLoading: true });
    vehicleType()
      .then(
        axios.spread((...res) => {
          //   console.log(res[0].data.result.data);
          this.setState({
            popularVehicle: res[0].data.result.data,
            carsData: res[1].data.result.data,
            motorbikesData: res[2].data.result.data,
            bikesData: res[3].data.result.data,
            isLoading: false,
          });
        })
      )
      .catch((err) => console.error(err));
  };
  componentDidMount() {
    // console.log('keyword', this.state.keyword)
    if (this.state.keyword === null && this.props.location.search === "") {
      this.setState({
        isSearching: false,
      });
      this.getData();
    } else {
      let filter = "";
      const searchParams = new URLSearchParams(this.props.location.search);
      const page = !searchParams.get("page") ? "1" : searchParams.get("page");
      filter += "&page=" + page;
      this.setState({
        filter: filter,
        isSearching: true,
      });
    }
  }

  debounce = (func, delay) => {
    let timeOutId;
    return (...args) => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  onSearch = (e) => {
    const keyword = e.target.value.trim();
    let params = this.props.location.search;
    // const searchParams = new URLSearchParams(params);
    // console.log(searchParams.get('keyword'), "keyword");
    let filter = "";
    if (keyword !== null && params !== "") {
      // filter = { ...params, keyword };
      filter += params + "&keyword=" + keyword;
      // this.props.history.push(filter);
    }
    this.setState({
      filter: filter,
      keyword: keyword,
      isSearching: true,
      // params: params,
    });
    if (params !== "") {
      this.props.history.push(filter);
    } else {
      filter += "vehicles?keyword=" + keyword;
      this.setState({
        filter: filter,
      });
      this.props.history.push(filter);
    }
    // console.log("param", params);
    // console.log("filter", filter);
  };

  componentDidUpdate(prev) {
    const location = this.props.location;
    if (prev.location.search !== location.search) {
      this.setState({
        isSearching: true,
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  render() {
    const { isLoading, keyword, isSearching, filter } = this.state;
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
                  name="search"
                  onChange={this.debounce(this.onSearch, 1000)}
                  onKeyPress={(e) => e.key === "Enter" && this.onSearch}
                  autoComplete="off"
                />
              </div>
              <div className="searchIcon">
                <SearchIcon />
              </div>
            </div>
          </div>
          {!isLoading && !isSearching ? (
            <div className="container">
              <h2>Popular in Town</h2>
              <div className="view-more" style={{ textAlign: "right" }}>
                <Link to="/vehicles/popular?order=desc&page=1&limit=8">
                  View All {">"}{" "}
                </Link>
              </div>
              <div className="row">
                <VehicleCard vehicleData={this.state.popularVehicle} />
              </div>

              <h2>Cars</h2>
              <div className="view-more" style={{ textAlign: "right" }}>
                <Link to="/vehicles/car?page=1&limit=8">View All {">"} </Link>
              </div>
              <div className="row">
                <VehicleCard vehicleData={this.state.carsData} />
              </div>

              <h2>Motorbikes</h2>
              <div className="view-more" style={{ textAlign: "right" }}>
                <Link to="/vehicles/motorbike?page=1&limit=8">View All {">"} </Link>
              </div>
              <div className="row">
                <VehicleCard vehicleData={this.state.motorbikesData} />
              </div>

              <h2>Bikes</h2>
              <div className="view-more" style={{ textAlign: "right" }}>
                <Link to="/vehicles/bike?page=1&limit=8">View All {">"} </Link>
              </div>
              <div className="row mb-5">
                <VehicleCard vehicleData={this.state.bikesData} />
              </div>
            </div>
          ) : !isLoading && isSearching ? (
            <SearchVehicles
              location={this.props.location}
              filter={filter}
              keyword={keyword}
            />
          ) : (
            <Loading />
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default VehicleType;
