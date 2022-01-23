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
// const popularURL = process.env.REACT_APP_HOST + "/vehicles/popular?order=desc";
// export const popular = () => {
//   return axios.get(popularURL);
// };


const vehiclesURL = process.env.REACT_APP_HOST + "/vehicles";
export const vehicles = (URL) => {
 return axios.get(vehiclesURL+URL)
}


// card popular
const cardURL =
  process.env.REACT_APP_HOST + "/vehicles/popular?page=1&limit=4";
export const popularCard = () => {
  return axios.get(cardURL);
};

// detail vehicle
export const getDetailVehicle = (vehicleId) => {
  const detailURL = process.env.REACT_APP_HOST + `/vehicles/`+vehicleId;
  return axios.get(detailURL)
}

// post vehicle
const postVehicleURL = process.env.REACT_APP_HOST + "/vehicles";
export const postVehicle = (body, token) => {
  return axios.post(postVehicleURL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

// update vehicle
export const updateVehicle = (vehicleId, body, token) => {
  const updateVehicleURL = process.env.REACT_APP_HOST + "/vehicles/"+vehicleId;
  return axios.patch(updateVehicleURL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

// delete vehicle
export const deleteVehicle = (vehicleId, token) => {
  const deleteVehicleURL = process.env.REACT_APP_HOST + "/vehicles/"+vehicleId;
  return axios.delete(deleteVehicleURL, {
    headers: {
      "x-access-token": token,
    },
  });
};