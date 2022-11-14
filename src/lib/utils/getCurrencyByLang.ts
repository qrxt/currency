import { CurrencySymbol } from "types/currency";
import config from "../../config.json";
import getLangBase from "./getLangBase";

export default (lang: string) => {
  const { fallbackCurrency, currencyByLang } = config.currencies;
  const dict = currencyByLang as Record<string, CurrencySymbol>;
  const langBase = getLangBase(lang);

  if (langBase) {
    return dict[langBase] || fallbackCurrency;
  }

  return fallbackCurrency;
};
