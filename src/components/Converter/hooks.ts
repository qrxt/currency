import { CurrencySymbol, Symbols } from "types/currency";
import filter from "lodash/filter";
import find from "lodash/find";
import includes from "lodash/includes";
import keys from "lodash/keys";
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import { OptionBase } from "chakra-react-select";

export interface CurrencyOption extends OptionBase {
  value: string;
  label: string;
}

export function useCurrencyOptions(symbols: Symbols): CurrencyOption[] {
  return map(keys(symbols), (symbol) => ({
    label: symbol,
    value: symbol,
  }));
}

export function useConverter({
  from,
  to,
  currencyOptions,
}: {
  from: CurrencySymbol | null;
  to?: CurrencySymbol | null;
  currencyOptions: CurrencyOption[];
}) {
  const sort = (options: CurrencyOption[]) => {
    const priorityCurrencies = ["USD", "RUB", "EUR"];
    return sortBy(
      options,
      (option) => !includes(priorityCurrencies, option.value)
    );
  };

  const fromOptionsFiltered = filter(
    currencyOptions,
    (option) => option.value !== to
  );
  const toOptionsFiltered = filter(
    currencyOptions,
    (option) => option.value !== from
  );

  const fromOptions = sort(fromOptionsFiltered);
  const toOptions = sort(toOptionsFiltered);

  const fromValue = find(currencyOptions, (currency) => currency.value == from);
  const toValue = find(currencyOptions, (currency) => currency.value == to);

  return {
    fromOptions: fromOptions,
    toOptions: toOptions,
    fromValue,
    toValue,
  };
}
