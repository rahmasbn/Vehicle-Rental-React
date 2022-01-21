import React from "react";
import { Link } from "react-router-dom";

import "./card.css";

function VehicleCard(props) {
  const vehicleData = props.vehicleData;
  // console.log("card", JSON.parse(vehicleData[0].images)[0], 'test=', `/${JSON.parse(vehicleData[0].images)[0]}`);
  const card = [];
  // let photos = JSON.parse()
  for (let idx = 0; idx < vehicleData.length; idx++) {
    const imgURL = process.env.REACT_APP_HOST + `/${JSON.parse(vehicleData[idx].images)[0]}`;
    const id = vehicleData[idx].id;
    const vehicle = vehicleData[idx].vehicle;
    const city = vehicleData[idx].city;
    const element = (
      <div
        className="col-lg-3 col-md-3 col-sm-6 col-6 d-flex align-item-stretch cardVehicle"
        key={"card" + idx}
      >
        <div className="card border-0 bg-light">
          <Link to={`/vehicle/${id}`}>
            <img src={imgURL} className="card-img-top" alt="vehicle-img"/>
          <div className="card-body d-flex flex-column">
            <h3 className="card-title">{vehicle}</h3>
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

export default VehicleCard;
