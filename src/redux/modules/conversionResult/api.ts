import axios from "axios";
import { getEndpoint } from "lib/getEndpoint";

export async function getConversionResult() {
  const { path, method } = getEndpoint("getConversionResult");

  return axios({ url: path, method })
    .then((response) => {
      console.log("axios getConversionResult response: ", response);

      return response;
    })
    .catch((error) => {
      console.error("axios getConversionResult error: ", error);
    });
}
const api = {
  getConversionResult,
};

export default api;
