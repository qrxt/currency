import { currencySymbolHandlers } from "../mocks/handlers/currencySymbols";
import { conversionHandlers } from "../mocks/handlers/conversions";
import { timeSeriesHandlers } from "../mocks/handlers/timeSeries";

export const handlers = [
  ...currencySymbolHandlers,
  ...conversionHandlers,
  ...timeSeriesHandlers,
];
