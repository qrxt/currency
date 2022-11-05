import { CurrencySymbol } from "types/currency";
import { Rate } from "types/rate";

function formatDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function getNDaysAgo(days: number, date = new Date()) {
  const daysAgo = new Date(date.getTime());

  daysAgo.setDate(date.getDate() - days);

  return daysAgo;
}

export function generateRate(currency: CurrencySymbol): Rate {
  return {
    [currency]: Math.random(),
  };
}

export function generateRates(length: number, seriesCurrency: CurrencySymbol) {
  const dateStrings = Array.from({ length }).map((_, idx) =>
    formatDate(getNDaysAgo(idx))
  );

  return dateStrings.map((dateString) => ({
    [dateString]: generateRate(seriesCurrency),
  }));
}
