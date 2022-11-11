import { first } from "lodash";
import { CurrencySymbol } from "types/currency";
import config from "../../config.json";

export default (lang: string) => {
  const { fallbackCurrency, currencyByLang } = config.currencies;
  const dict = currencyByLang as Record<string, CurrencySymbol>;
  const langBase = first(lang.split("-"));

  if (langBase) {
    return dict[langBase] || fallbackCurrency;
  }

  return fallbackCurrency;
};
