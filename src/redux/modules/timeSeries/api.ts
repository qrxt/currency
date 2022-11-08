import axios from "axios";
import { getEndpoint } from "lib/getEndpoint";
import { CurrencySymbol } from "types/currency";

export async function getCurrencyTimeSeries(
  startDate: string,
  endDate: string,
  base?: CurrencySymbol,
  symbol?: CurrencySymbol
) {
  if (!base || !symbol) {
    throw new Error(
      `Base of target symbol is not specified: ${base}, ${symbol}`
    );
  }

  const { path, method } = getEndpoint("getCurrencyTimeSeries", {
    startDate,
    endDate,
    base,
    symbol,
  });

  return axios({ url: path, method })
    .then((response) => {
      console.log("axios getCurrencyTimeSeries response: ", response);

      return {
        ...response,
        data: {
          ...response.data,
          target: symbol,
        },
      };
    })
    .catch((error) => {
      console.error("axios getCurrencyTimeSeries error: ", error);
    });
}
const api = {
  getCurrencyTimeSeries,
};

export default api;
