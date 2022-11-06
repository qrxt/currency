import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import ExchangeRates from "./ExchangeRates";
import { useChart } from "./hooks";

// TODO: get from redux
const series = {
  base: "USD",
  end_date: "2022-11-02",
  rates: {
    "2022-10-25": {
      RUB: 62.250018,
    },
    "2022-10-26": {
      RUB: 61.275022,
    },
    "2022-10-27": {
      RUB: 61.32499,
    },
    "2022-10-28": {
      RUB: 61.525038,
    },
    "2022-10-29": {
      RUB: 61.525038,
    },
    "2022-10-30": {
      RUB: 61.524985,
    },
    "2022-10-31": {
      RUB: 62.049837,
    },
    "2022-11-01": {
      RUB: 61.749903,
    },
    "2022-11-02": {
      RUB: 61.67497,
    },
  },
  start_date: "2022-10-25",
  success: true,
  timeseries: true,
};
// TODO: get from redux

function ExchangeRatesContainer() {
  const [chartOptions, timeseries] = useChart(series);
  const [baseCurrencyCookie, setBaseCurrencyCookie] = useCookies([
    "base-currency",
  ]);

  useEffect(() => {
    // TODO: determine by location / lang
    if (isEmpty(baseCurrencyCookie)) {
      setBaseCurrencyCookie("base-currency", "USD");
    }
  }, [baseCurrencyCookie, setBaseCurrencyCookie]);

  return (
    chartOptions && (
      <ExchangeRates chartOptions={chartOptions} timeseries={timeseries} />
    )
  );
}

export default ExchangeRatesContainer;
