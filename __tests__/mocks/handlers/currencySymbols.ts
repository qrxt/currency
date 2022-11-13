import { rest } from "msw";
import config from "../../../src/config.json";

const symbols = {
  success: true,
  symbols: {
    AED: "United Arab Emirates Dirham",
    AFN: "Afghan Afghani",
    ALL: "Albanian Lek",
  },
};

export const currencySymbolHandlers = [
  rest.get(
    `${config.network.testRequestUrlBase}/exchangerates_data/symbols`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(symbols));
    }
  ),
];
