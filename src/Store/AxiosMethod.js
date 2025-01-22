import axios from "axios";

// const BASIC_URL = "https://shobha-gold-nodejs.onrender.com";
// const BASIC_URL = "http://192.168.29.53:4000";
const BASIC_URL = "https://api-shobha-gold.onrender.com";



export const axiosApi = axios.create({
  baseURL: BASIC_URL,
  withCredentials: true,
});

axiosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    console.log("error");
  }
  return config;
});
