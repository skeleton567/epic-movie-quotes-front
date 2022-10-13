import axios from "axios";
import { getJwtToken } from "@/helpers/jwt/index.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export default axiosInstance;
