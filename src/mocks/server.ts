import express, { Express } from "express";

import symbols from "./data/symbols.json";
import { generateRates } from "./data/dataGenerators/generateTimeseries";
import { generateConverted } from "./data/dataGenerators/generateConverted";

const app: Express = express();

app.use(function (req, res, next) {
  setTimeout(next, 300);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/exchangerates_data/symbols", (req, res) => {
  console.log(req.originalUrl);

  res.send(symbols);
});

app.get("/exchangerates_data/convert", (req, res) => {
  // ?to=RUB&from=USD&amount=5
  console.log(req.originalUrl);

  const amount = req.query.amount;
  const from = req.query.from;
  const to = req.query.to;

  const converted = generateConverted(
    amount as string,
    from as string,
    to as string
  );

  res.send(converted);
});

app.get("/exchangerates_data/timeseries", (req, res) => {
  // ?start_date=2022-11-01&end_date=2022-11-07&base=USD&symbols=RUB

  //   {
  //     "success": true,
  //     "timeseries": true,
  //     "start_date": "2022-11-02",
  //     "end_date": "2022-11-09",
  //     "base": "USD",
  //     "rates": {
  //         "2022-11-02": {
  //             "RUB": 61.701962
  //         },
  //         "2022-11-03": {
  //             "RUB": 62.350083
  //         },
  //         "2022-11-04": {
  //             "RUB": 62.000341
  //         },
  //         "2022-11-05": {
  //             "RUB": 62.000341
  //         },
  //         "2022-11-06": {
  //             "RUB": 62.000023
  //         },
  //         "2022-11-07": {
  //             "RUB": 63.202635
  //         },
  //         "2022-11-08": {
  //             "RUB": 60.974982
  //         },
  //         "2022-11-09": {
  //             "RUB": 61.259021
  //         }
  //     }
  // }

  console.log(req.originalUrl);

  const base = req.query.base;

  const rates = generateRates(7, "EUR");

  const result = {
    base: base,
    rates: rates,
  };

  res.send(result);
});

app.listen(3000);
