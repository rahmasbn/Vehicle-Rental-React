import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchVehicles } from "../../utils/https/vehicles";
import VehicleCard from "../Card";
import Loading from "../Loading";

class SearchVehicles extends Component {
  state = {
    isSuccess: false,
    keyword: null,
    searchResult: null,
    meta: null,
    filter: "",
    // page: "",
  };

  searchVehicle = (keyword, filter) => {
    searchVehicles(filter)
      .then((res) => {
        console.log("search", res.data);
        this.setState({
          isSuccess: true,
          searchResult: res.data.result.data,
          meta: res.data.result.meta,
          keyword: keyword,
          // page: res.data.result.meta.page,
          filter: filter,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateFilter = (newFilter) => {
    console.log("update", newFilter);
    this.searchVehicle(null, newFilter);
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
    const searchParams = new URLSearchParams(this.props.filter);
    const keyword = searchParams.get("keyword");
    // const page = parseInt(this.props.page)
    // console.log('filter1', filter)
    // console.log("keyword", keyword);
    this.searchVehicle(keyword, filter);
  }

  componentDidUpdate(a, b) {
    // console.log('a dan b', a, b)
    const filter = this.props.location.search;
    const searchParams = new URLSearchParams(this.props.filter);
    const keyword = searchParams.get("keyword");
    if (a.location.search !== filter) {
      this.searchVehicle(keyword, filter);
    }
  }
  render() {
    // console.log("result", this.state.searchResult);
    const { isSuccess, searchResult } = this.state;
    return (
      <>
        {isSuccess ? (
          <div className="container">
            {searchResult.length !== 0 ? (
              <div className="row mt-5">
                <VehicleCard vehicleData={searchResult} />
              </div>
            ) : (
              <div className="col-12 text-center mt-5 fs-5">
                We can't find anything you're looking for.
              </div>
            )}
            <div className="mt-5">{this.pagination(this.state.meta)}</div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default SearchVehicles;
