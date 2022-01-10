import axios from "axios";

// login
const loginURL = process.env.REACT_APP_HOST + "/auth/login";
export const login = (body) => {
  return axios.post(loginURL, body);
};

// register
const registerURL = process.env.REACT_APP_HOST + "/auth/register";
export const register = (body) => {
  return axios.post(registerURL, body);
};
