import axios from "axios";

// vehicleType
// const urlPopular = process.env.REACT_APP_HOST + "/vehicles/popular?order=desc&page=1&limit=4"
// const urlCar = process.env.REACT_APP_HOST + "/vehicles?page=1&limit=4&type=car"
// const urlMotorbike = process.env.REACT_APP_HOST + "/vehicles?page=1&limit=4&type=motorbike"
// const urlBike = process.env.REACT_APP_HOST = "/vehicles?page=1&limit=4&type=bike"
// export const vehicleType = () => {
//     axios.get(urlPopular);
//     axios.get(urlCar);
//     axios.get(urlMotorbike);
//     axios.get(urlBike);
//     return axios.all([urlPopular, urlCar, urlMotorbike, urlBike])
// }

// popular
const popularURL = process.env.REACT_APP_HOST + "/vehicles/popular?order=desc";
export const popular = () => {
  return axios.get(popularURL);
};

// motorbike
const motorbikeURL = process.env.REACT_APP_HOST + "/vehicles?type=motorbike";
export const motorbike = () => {
  return axios.get(motorbikeURL);
};

// cars
const carURL = process.env.REACT_APP_HOST + "/vehicles?type=car";
export const cars = () => {
  return axios.get(carURL);
};

// bike
const bikeURL = process.env.REACT_APP_HOST + "/vehicles?type=bike";
export const bike = () => {
  return axios.get(bikeURL);
};

// card popular
const cardURL = process.env.REACT_APP_HOST + "/vehicles/popular?order=desc&page=1&limit=4";
export const popularCard = () => {
  return axios.get(cardURL);
};
