import { ColorMode } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import first from "lodash/first";
import keys from "lodash/keys";
import values from "lodash/values";
import { CurrencySymbol } from "types/currency";
import { TimeSeries } from "types/timeSeries";

const getOptions = (dates: string[], colorMode: ColorMode): ApexOptions => ({
  theme: {
    mode: colorMode,
  },
  chart: {
    background: "transparent",
    width: "100%",
    id: "currencies",
    zoom: {
      enabled: false,
    },
    toolbar: {
      tools: {
        download: false,
      },
    },
    animations: {
      enabled: true,
      easing: "easeout",
      speed: 400,
      animateGradually: {
        enabled: true,
        delay: 250,
      },
      dynamicAnimation: {
        enabled: false,
      },
    },
  },
  stroke: {
    curve: "smooth",
    colors: ["#805ad5"],
  },
  colors: ["#815ad584"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      type: "vertical",
      colorStops: [
        [
          {
            offset: 70,
            color: "#6510F8",
            opacity: 0.2,
          },
          {
            offset: 97,
            color: "#6510F8",
            opacity: 0.0,
          },
        ],
      ],
    },
  },
  xaxis: {
    type: "datetime",
    categories: dates,
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(2);
      },
    },
  },
});

export function getChartOptions(timeseries: TimeSeries, colorMode: ColorMode) {
  const dates = keys(timeseries.rates);

  return getOptions(dates, colorMode);
}

export interface ChartSeries {
  type: string;
  data: number[];
  target: CurrencySymbol;
  today?: string;
}

export function getChart(timeSeries: TimeSeries) {
  const currencyValues = values(timeSeries.rates).map((rate) => {
    const currencyValues = values(rate)[0];

    return currencyValues;
  });

  const series: ChartSeries = {
    type: "area",
    data: currencyValues,
    target: timeSeries.target,
    today: first(currencyValues)?.toFixed(2),
  };

  return series;
}
