import axios from "axios";

const cityURL = process.env.REACT_APP_HOST + "/cities";
export const getCities = () => {
 return axios.get(cityURL)
}