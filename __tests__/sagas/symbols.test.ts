import { call, put } from "redux-saga/effects";
import { getSymbols } from "@redux/modules/symbols/sagas";
import { symbolsSlice } from "@redux/modules/symbols/slice";
import api from "@redux/modules/symbols/api";
import { createAxiosResponse } from "../helpers/api";

describe("Symbols saga test", () => {
  test("getSymbols success", () => {
    const saga = getSymbols();

    expect(saga.next().value).toEqual(call(api.getSymbols));

    const symbols = {
      USD: "United States Dollar",
      EUR: "Euro",
      RUB: "Russian Ruble",
    };
    const symbolsResponse = {
      success: true,
      symbols,
    };

    const response = createAxiosResponse({
      data: symbolsResponse,
    });

    expect(saga.next(response).value).toEqual(
      put(symbolsSlice.actions.getSymbolsSuccess(symbols))
    );
    expect(saga.next().done).toBeTruthy();
  });

  test("getSymbols failure", () => {
    const saga = getSymbols();

    expect(saga.next().value).toEqual(call(api.getSymbols));

    const errorMessage = "Failed to get symbols data";
    expect(saga.throw(errorMessage).value).toEqual(
      put(symbolsSlice.actions.getSymbolsFailure())
    );
    expect(saga.next().done).toBeTruthy();
  });
});
