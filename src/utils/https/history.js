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

export const createTransaction = (token, body) => {
  const URL = process.env.REACT_APP_HOST + "/transaction";
  return axios.post(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
