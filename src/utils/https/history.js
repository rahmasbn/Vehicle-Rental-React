import axios from "axios";

const getHistory = process.env.REACT_APP_HOST + "/transaction";
// const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
export const history = (token) => {
  return axios.get(getHistory, {
    headers: {
      "x-access-token": token,
    },
  });
};