import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // if you use cookies
});

export default axiosInstance;
