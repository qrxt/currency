import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    apikey: process.env.VITE_API_KEY || "",
  },
});
