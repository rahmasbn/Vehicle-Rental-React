import axios from "axios";

const loginURL = process.env.REACT_APP_HOST + "/auth/login";
export const login = (body) => {
  return axios.post(loginURL, body);
};

const registerURL = process.env.REACT_APP_HOST + "/auth/register";
export const register = (body) => {
  return axios.post(registerURL, body);
};

export const logout = (token) => {
  const URL = process.env.REACT_APP_HOST + "/auth/logout";
  return axios.delete(URL, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const forgotPassword = (body) => {
  const URL = process.env.REACT_APP_HOST + "/auth/forgot-password";
  return axios.post(URL, body);
};

export const verifyOTP = (body) => {
  const URL = process.env.REACT_APP_HOST + "/auth/check-otp";
  return axios.post(URL, body);
};

export const resetPass = (body) => {
  const URL = process.env.REACT_APP_HOST + "/auth/reset-password";
  return axios.post(URL, body);
};
