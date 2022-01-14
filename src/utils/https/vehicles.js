import axios from "axios";

// vehicleType
const getPopular = axios.get(
  process.env.REACT_APP_HOST + "/vehicles/popular?order=desc&page=1&limit=4"
);
const getCar = axios.get(
  process.env.REACT_APP_HOST + "/vehicles?page=1&limit=4&type=car"
);
const getMotorbike = axios.get(
  process.env.REACT_APP_HOST + "/vehicles?page=1&limit=4&type=motorbike"
);
const getBike = axios.get(
  process.env.REACT_APP_HOST + "/vehicles?page=1&limit=4&type=bike"
);
export const vehicleType = () => {
  return axios.all([getPopular, getCar, getMotorbike, getBike]);
};

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
const cardURL =
  process.env.REACT_APP_HOST + "/vehicles/popular?order=desc&page=1&limit=4";
export const popularCard = () => {
  return axios.get(cardURL);
};
