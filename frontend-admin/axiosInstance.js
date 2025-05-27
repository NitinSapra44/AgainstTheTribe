import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://againstthetribe.onrender.com",
  withCredentials: true, // if you use cookies
});

export default axiosInstance;
