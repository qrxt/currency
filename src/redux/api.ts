import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    apikey: import.meta.env.VITE_API_KEY,
  },
});
