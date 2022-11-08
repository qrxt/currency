import { formatDate, getNDaysAgo } from "../../../lib/utils/dates";
import { CurrencySymbol } from "types/currency";
import { Rate } from "types/rate";

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
