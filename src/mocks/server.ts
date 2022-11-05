import express, { Express } from "express";

import symbols from "./data/symbols.json";
import convert from "./data/convert.json";
import { generateRates } from "./data/dataGenerators/generateTimeseries";

const app: Express = express();

app.get("/exchangerates_data/symbols", (req, res) => {
  console.log(req.originalUrl);

  res.send(symbols);
});

app.get("/exchangerates_data/convert", (req, res) => {
  // ?to=RUB&from=USD&amount=5
  console.log(req.originalUrl);

  res.send(convert);
});

app.get("/exchangerates_data/timeseries", (req, res) => {
  // ?start_date=2022-10-25&end_date=2022-10-31
  console.log(req.originalUrl);

  const rates = generateRates(7, "EUR");
  const result = {
    base: "RUB",
    rates: rates,
  };

  res.send(result);
});

app.listen(3000);
