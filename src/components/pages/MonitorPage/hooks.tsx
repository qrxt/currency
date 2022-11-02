import { ColorMode, useColorMode } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import { keys, values } from "lodash";
import { useEffect, useState } from "react";

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

// TODO: move to types
interface TimeSeries {
  base: string; // TODO: replace with "CurrencyCode"
  rates: {
    [key: string]: {
      [key: string]: number; // TODO: replace with "CurrencyCode"
    };
  };
}

interface Series {
  type: string;
  data: number[];
}

export function useChart(
  timeseries: TimeSeries
): [options: ApexOptions | null, series: Series[]] {
  const { colorMode } = useColorMode();
  const dates = keys(timeseries.rates);
  const options = getOptions(dates, colorMode);

  const currencyValues = values(timeseries.rates).map((x) => x.RUB);

  const series = [
    {
      type: "area",
      data: currencyValues,
    },
  ];

  return [options, series];
}
