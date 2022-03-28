import axios from "axios";

const getProfile = process.env.REACT_APP_HOST + "/users/profile";
export const profile = (token) => {
  return axios.get(getProfile, {
    headers: {
      "x-access-token": token,
    },
  });
};

// const editProfile = process.env.REACT_APP_HOST + "/users/profile";
export const editProfile = (body, token) => {
  return axios.patch(getProfile, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

const editPassURL = process.env.REACT_APP_HOST + "/users/edit-password";
export const editPassword = (data, token) => {
  return axios.patch(editPassURL, data, {
    headers: {
      "x-access-token": token,
    },
  });
};
