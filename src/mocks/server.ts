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

  const converted = generateConverted(amount as string);

  res.send(converted);
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
