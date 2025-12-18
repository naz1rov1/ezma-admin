import axios from "axios";

export const API = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
