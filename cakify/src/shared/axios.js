import axios from "axios";
import { API } from "@/shared/index.js";

const apiClient = axios.create({
  baseURL: `${API}`,
  withCredentials: false,
  headers: {
     Accept: "application/json",
             "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(function (config) {
  let token = JSON.parse(localStorage.getItem('token'));
  let email = JSON.parse(localStorage.getItem('email'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.email = `${email}`;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

apiClient.interceptors.response.use((response) => {
  response.headers.email = JSON.parse(localStorage.getItem('email'));
  return response;
});

export default apiClient;