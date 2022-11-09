import { CurrencySymbol } from "./currency";
import { Rate } from "./rate";

export interface TimeSeries {
  base: CurrencySymbol;
  target: CurrencySymbol;
  rates: {
    [date: string]: Rate;
  };
}
