import { axiosInstance } from "@redux/api";
import { getEndpoint } from "lib/getEndpoint";
import { CurrencySymbol } from "types/currency";

export async function getConversionResult(
  amount: string,
  from: CurrencySymbol,
  to: CurrencySymbol
) {
  const { path, method } = getEndpoint("getConversionResult", {
    amount,
    from,
    to,
  });

  return axiosInstance({ url: path, method })
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
