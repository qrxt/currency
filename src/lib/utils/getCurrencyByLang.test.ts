import getCurrencyByLang from "./getCurrencyByLang";
import config from "../../config.json";

describe("getCurrencyByLang", () => {
  test("getCurrencyByLang should return correct values", () => {
    const actual = [getCurrencyByLang("ru"), getCurrencyByLang("en")];
    const expected = ["RUB", "USD"];

    expect(actual).toEqual(expected);
  });

  test("getCurrencyByLang should return fallback currency if lang is unknown", () => {
    const actual = getCurrencyByLang("asd");
    const expected = config.currencies.fallbackCurrency;

    expect(actual).toEqual(expected);
  });
});
