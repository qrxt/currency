import { axiosInstance } from "@redux/api";
import { getEndpoint } from "lib/getEndpoint";
import Logger from "lib/logger";

export async function getSymbols() {
  const { path, method } = getEndpoint("getSymbols");

  return axiosInstance({ url: path, method })
    .then((response) => {
      Logger.log("axios getSymbols response: ", response);

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
