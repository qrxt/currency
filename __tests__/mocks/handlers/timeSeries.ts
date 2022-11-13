import { rest } from "msw";
import config from "../../../src/config.json";

const series = {
  base: "RUB",
  end_date: "2022-10-31",
  rates: {
    "2022-10-25": {
      USD: 60.416064,
    },
    "2022-10-26": {
      USD: 60.21632,
    },
    "2022-10-27": {
      USD: 60.716307,
    },
    "2022-10-28": {
      USD: 60.116254,
    },
    "2022-10-29": {
      USD: 60.316254,
    },
    "2022-10-30": {
      USD: 60.816254,
    },
    "2022-10-31": {
      USD: 60.616194,
    },
  },
  start_date: "2022-10-25",
  success: true,
  timeseries: true,
};

export const timeSeriesHandlers = [
  rest.get(
    `${config.network.testRequestUrlBase}/exchangerates_data/timeseries`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(series));
    }
  ),
];
