import { CurrencySymbol } from "./currency";
import { Rates } from "./rate";

export interface TimeSeries {
  base: CurrencySymbol;
  target: CurrencySymbol;
  rates: Rates[];
}
