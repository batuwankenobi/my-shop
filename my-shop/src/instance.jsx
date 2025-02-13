import axios from "axios";

export const ecommerceAPI = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});