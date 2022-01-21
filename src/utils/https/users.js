import axios from "axios";

const getProfile = process.env.REACT_APP_HOST + "/users/profile";
const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
export const profile = () => {
  return axios.get(getProfile, {
    headers: {
      "x-access-token": token,
    },
  });
};

// const editProfile = process.env.REACT_APP_HOST + "/users/profile";
// const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
export const editProfile = (body) => {
  return axios.patch(getProfile, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
