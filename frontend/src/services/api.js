import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-backend-shiv.onrender.com",
});

export default API;