import axios from "axios";
const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  timeout: 10000,
});
