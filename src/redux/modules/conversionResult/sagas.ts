import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ConversionResult } from "types/conversion";
import api from "./api";
import { conversionResultSlice } from "./slice";

export function* getConversionResult() {
  try {
    const response: AxiosResponse<ConversionResult> = yield call(
      api.getConversionResult
    );
    const conversionResult = response.data;

    yield put(
      conversionResultSlice.actions.getConversionResultSuccess(conversionResult)
    );
  } catch (error) {
    const errorMessage = String(error) || "An unknown error occurred";
    console.error("failed to get symbols list: ", errorMessage);

    yield put(
      conversionResultSlice.actions.getConversionResultFailure(errorMessage)
    );
  }
}

export const getConversionResultSaga = takeLatest(
  conversionResultSlice.actions.getConversionResult,
  getConversionResult
);
