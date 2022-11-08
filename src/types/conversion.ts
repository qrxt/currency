import { CurrencySymbol } from "./currency";

export interface ConversionResult {
  query: {
    from: CurrencySymbol;
    to: CurrencySymbol;
  };
  result: number;
}

export type Conversion = [
  CurrencySymbol | undefined,
  CurrencySymbol | undefined
];
