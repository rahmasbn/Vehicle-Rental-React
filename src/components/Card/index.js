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


export function historyCard(props) {
  return (
    <>
    <div className="card-history d-flex">
              <div className="img">
                <img src={props.image} alt="img vehicle" />
              </div>
              <div className="info-history-vehicle">
                <p className="vehicle-name">
                  <strong>{props.name}</strong>
                </p>
                <p className="rental-date">{props.start_date} to {props.return_date}</p>
                <p className="total-price">
                  <strong>Prepayment: Rp. {props.total_payment}</strong>
                </p>
                <p className="status-history">{props.status}</p>
              </div>
            </div>
            <div className="select-box">
              <div className="checkbox">
                <input
                  className="form-check-input check"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                />
              </div>
            </div>

    {/* <div className="card-history">
        <div className="img">
          <img src={props.image} alt="vehicle" />
        </div>
        <p className="vehicle">
          <strong>{props.name} </strong> <br />
          {props.date}
        </p>
        <p className="rating">
          Rating : <strong>{props.rating}</strong>{" "}
        </p>
        <p className="price">
          <strong>Prepayment : Rp. {props.price} </strong>
        </p>
        <p className="status">
          {" "}
          <strong>{props.status}</strong>{" "}
        </p>
        <div className="aka">
          <div className="checkbox">
            <input class="form-check-input check" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default VehicleCard;
