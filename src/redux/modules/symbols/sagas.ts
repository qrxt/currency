import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { Symbols } from "types/currency";
import api from "./api";
import { symbolsSlice } from "./slice";
interface Response {
  success: boolean;
  symbols: Symbols;
}

export function* getSymbols() {
  try {
    const response: AxiosResponse<Response> = yield call(api.getSymbols);
    const symbolsData = response.data.symbols;

    yield put(symbolsSlice.actions.getSymbolsSuccess(symbolsData));
  } catch (error) {
    const errorMessage = String(error) || "An unknown error occurred";
    console.error("failed to get symbols list: ", errorMessage);

    yield put(symbolsSlice.actions.getSymbolsFailure(errorMessage));
  }
}

export const getSymbolsSaga = takeLatest(
  symbolsSlice.actions.getSymbols,
  getSymbols
);
