import { rest } from "msw";
import config from "../../../src/config.json";

const conversionResult = {
  date: "2022-10-31",
  info: {
    rate: 61.801083,
    timestamp: 1667236803,
  },
  query: {
    amount: 5,
    from: "AED",
    to: "ALL",
  },
  result: 309.005415,
  success: true,
};

export const conversionHandlers = [
  rest.get(
    `${config.network.testRequestUrlBase}/exchangerates_data/convert`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(conversionResult));
    }
  ),
];
