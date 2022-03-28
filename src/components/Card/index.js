import React from "react";
import { Link } from "react-router-dom";

import "./card.css";

function VehicleCard(props) {
  const vehicleData = props.vehicleData;
  console.log(vehicleData);
  // console.log("card", JSON.parse(vehicleData[0].images)[0], 'test=', `/${JSON.parse(vehicleData[0].images)[0]}`);
  const card = [];
  // let photos = JSON.parse()
  for (let idx = 0; idx < vehicleData.length; idx++) {
    const imgURL =
      vehicleData[idx].images !== null
        ? process.env.REACT_APP_HOST +
          `/${JSON.parse(vehicleData[idx].images)[0]}`
        : require("../../assets/images/default-cars.jpeg");

    const id = vehicleData[idx].id;
    const name = vehicleData[idx].name;
    const city = vehicleData[idx].city;
    const element = (
      <div
        className="col-lg-3 col-md-3 col-sm-6 col-6 d-flex cardVehicle"
        key={"card" + idx}
      >
        <div className="card border-0 bg-light">
          <Link to={`/vehicle/${id}`}>
            <img
              src={imgURL}
              className="card-img-top"
              alt="vehicle-img"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = require("../../assets/images/default-cars.jpeg");
              }}
            />
            <div className="card-body d-flex flex-column">
              <h3 className="card-title">{name}</h3>
              <p className="card-text">{city}</p>
            </div>
          </Link>
        </div>
      </div>
    );
    card.push(element);
  }
  return card;
}

export function HistoryCard(props) {
  const history = props.history;
  const historyCard = [];
  // const [idCheck, setIdCheck] = useState("");

  for (let idx = 0; idx < history.length; idx++) {
    const moment = require("moment");
    const formatPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(history[idx].total_payment);
    const imgURL =
      process.env.REACT_APP_HOST + `/${JSON.parse(history[idx].images)[0]}`;
    const vehicle = history[idx].vehicle;
    const start_date = moment(history[idx].start_date).format("DD-MM-YYYY");
    const return_date = moment(history[idx].return_date).format("DD-MM-YYYY");
    const payment = formatPrice;
    const status = history[idx].status;
    // const id = history[idx].id;
    // console.log("id history", id);
    // const rating = history[idx].rating;
    const element = (
      <>
        <div className="card-history" key={"history" + idx}>
          <div className="img">
            <img
              src={imgURL}
              alt="img vehicle"
              onError={({ currentTarget }) => {
                currentTarget.onError = null;
                currentTarget.src = require("../../assets/images/default_vehicle.png");
              }}
            />
          </div>
          <div className="info-history-vehicle">
            <p className="vehicle-name">
              <strong>{vehicle}</strong>
            </p>
            <p className="rental-date">
              {start_date} to {return_date}
            </p>
            <p className="total-price">
              <strong>Prepayment: {payment}</strong>
            </p>
            <p className="status-history">{status}</p>
            {/* <p className="rating-vehicle">
              <strong>Rating: {rating}</strong>{" "}
            </p> */}
          </div>
          <div className="select-box">
            <div className="checkbox">
              <input
                className="form-check-input check"
                type="checkbox"
                id="checkboxNoLabel"
                value=""
                // onChange={(e) => {
                //   if (e.target.checked === true) {
                //     setIdCheck(id);
                //   }
                // }}
              />
            </div>
          </div>
        </div>
      </>
    );
    historyCard.push(element);
  }
  return historyCard;
}

export default VehicleCard;
