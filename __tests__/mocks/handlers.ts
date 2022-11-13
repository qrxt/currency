import { currencySymbolHandlers } from "../mocks/handlers/currencySymbols";
import { conversionHandlers } from "../mocks/handlers/conversions";
// import { exchangeRates } from '../mocks/handlers/timeSeries';

export const handlers = [...currencySymbolHandlers, ...conversionHandlers];
