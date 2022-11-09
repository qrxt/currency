import { axiosInstance } from "@redux/api";
import { getEndpoint } from "lib/getEndpoint";

export async function getSymbols() {
  const { path, method } = getEndpoint("getSymbols");

  return axiosInstance({ url: path, method })
    .then((response) => {
      console.log("axios getSymbols response: ", response);

      return response;
    })
    .catch((error) => {
      console.error("axios getSymbols error: ", error);
    });
}
const api = {
  getSymbols,
};

export default api;
